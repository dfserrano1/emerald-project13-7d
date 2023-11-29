'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findByGallery(ctx) {
        const {uid} = ctx.params
        let report = await strapi.services.reports.findOne({unique_key: uid})
        return sanitizeEntity(report, {model: strapi.models.reports})
    }
};
