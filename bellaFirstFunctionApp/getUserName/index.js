module.exports = async function (context, req) {
    context.log('콘솔정보입니다.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "안녕하세요, " + name + "님의 방문을 환영합니다.."
        : "누구세욘?";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}