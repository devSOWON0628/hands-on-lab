import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import articlesService from "../services/articlesService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  let response;

  try {

    //호출주소(url)로 전달되는 게시글의 고유번호
    //domain.com/article/1
    const id = req.params.id;

    //http본문으로 전달되는 json데이터
    const searchData = req.body;
    
    let article = await articlesService.read(id,searchData.ipaddress);
    response = { body: article, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};

export default httpTrigger;
