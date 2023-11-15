const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {
    /*UPLOAD TO ITEM TABLE*/
    this.on('upload_item', async (req) => {
        try {
            let body = req.data.uploadItem
            let result = await this.run(INSERT.into('DB_ESG_MANUAL_TRANS', body))
            console.log(result)
        } catch (error) {
            console.error(error)
            return false
        }
    }),

    /*UPLOAD TO HEADER TABLE*/
    this.on('upload_header', async (req) => {
        try {
            let body = req.data.uploadHeader
            let result = await this.run(INSERT.into('ESG_MEASURE_MASTER', body))
            console.log(result)
        } catch (error) {
            console.error(error)
            return false
        }
    }),

    /*DELETE HEADER TABLE*/
    this.on('delete_header', async (req) => {
        try {
            let result = await this.run(DELETE.from('ESG_MEASURE_MASTER'))
            console.log(result)
        } catch (error) {
            console.error(error)
            return false
        }
    }),

    /*DELETE ITEM TABLE*/
    this.on('delete_item', async (req) => {
        try {
            let result = await this.run(DELETE.from('DB_ESG_MANUAL_TRANS'))
            console.log(result)
        } catch (error) {
            console.error(error)
            return false
        }
    })
})