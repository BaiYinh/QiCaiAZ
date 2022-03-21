const fs = require("fs");
const Path = ".\\Data\\棋才.json"

function qicai(e) {
    if (e.raw_message == 'az') {
        if (e.sender.user_id == 1957567536) {
            fs.access(Path, (err) => {
                if (err) {
                    fs.appendFileSync(Path, '{"棋才": 0}', 'utf-8', (err) => { });
                }
            });
            var RawData = fs.readFileSync(Path);
            var Data = JSON.parse(RawData);
            var NewData = {
                "棋才": Data.棋才 + 1
            };
            let data = JSON.stringify(NewData, null, "\t");
            fs.writeFile(Path, data, (err) => {
                if (err) {
                    log(err);
                    return;
                }
                log('写入成功');
                return;
            });
        }
        return;
    }
}

function log(a) {
    NIL.Logger.info('JsonPlugins', a);
} //log输出格式

function onStart() {
    NIL.FUNC.PLUGINS.GROUP.push(qicai);
    log('加载成功');
} //加载

function onStop() {
    log('插件已卸载');
} //卸载

module.exports = {
    onStart,
    onStop
}; //插件安装