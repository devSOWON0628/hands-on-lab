import { CosmosClient } from "@azure/cosmos";

// DB endpoint. local.setting.json 파일에 정의 되어있다. env같은거
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const articleService = {
  // DB connect
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("bellablogdb");
      this.container = this.database.container("articles");
    } catch (err) {
      console.log(err.message);
    }
  },
  async create(articleToCreate) {
    const { resource } = await this.container.items.create(articleToCreate);
    return resource;
  },
  async readAll(): Promise<string> {
    // readAll 후 fetchAll을 해야 우리가 흔히 아는 JSON 형태로 변환할 수 있음
    const iterator = this.container.items.readAll();
    const { resources } = await iterator.fetchAll();
    return resources;
  },
  async read(id,ipaddress): Promise<string> {
    // ipaddress는 id를 보조할 수 있는 유니크한 키
    const item = this.container.item(id,ipaddress); // findByIdAndIpAddress 같은 느낌
    const article = await item.read();
    return article.resource;
  },
  async update(article) {
    const { resource } = await this.container.item(article.id)
      .replace(article);
    return resource;
  },
  async delete(id,ipaddress) {
    const result = await this.container.item(id,ipaddress).delete();
  },
};

articleService.init();

export default articleService;