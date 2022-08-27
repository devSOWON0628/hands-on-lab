import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import articlesService from "../services/articlesService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let response;

  try {
    const id = req.params.id;
    const article = req.body;
    const result = await articlesService.delete(id,article.ipaddress);
    response = { body: result, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};

export default httpTrigger;
