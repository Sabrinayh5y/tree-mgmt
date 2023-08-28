const fs = require("fs")
const { rollup } = require('rollup')
const { minify } = require("terser")
const rollupConfig = require('./rollup.config.js')
const { error, log } = require('devby')
const package = require("../package.json")

let banner = `/*!
* Tree-Mgmt v${package.version}
* ${package.repository.url}
*
* Copyright ${package.author}
* Released under the ${package.license} license
* 
* Publish Date:  ${new Date()}
*/`

let sourceFile = "./src/index.ts"
let targetFile = "./dist/index." + rollupConfig.output.format + ".js"
let targetFile_min = "./dist/index." + rollupConfig.output.format + ".min.js"

new Promise(function (resolve, reject) {

    rollup({
        input: sourceFile,
        plugins: rollupConfig.plugins
    }).then(bundle => {
        bundle.write({
            name: "treeMgmt",
            format: rollupConfig.output.format,
            banner,
            file: targetFile
        }).then(() => {
            resolve()
        }).catch((e) => {
            reject(e)
        })
    }).catch((e) => {
        reject(e)
    })

}).then(() => {

    minify(fs.readFileSync(targetFile, "utf-8"), {
        toplevel: true,
    }).then((data) => {
        fs.writeFileSync(targetFile_min, data.code)
        log("\n打包完成\n")
    }).catch((e) => {
        error("\n打包失败\n")
    })

})