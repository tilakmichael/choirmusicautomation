"use strict";
var router_1 = require("@angular/router");
var app_stmark_groups_1 = require("./app.stmark.groups");
var app_stmark_defautl_1 = require("./app.stmark.defautl");
var app_stmark_members_1 = require("./app.stmark.members");
var app_stmark_hymns_1 = require("./app.stmark.hymns");
var app_stmark_schedule_1 = require("./app.stmark.schedule");
var app_stmark_sch_rpt_1 = require("./app.stmark.sch.rpt");
var app_about_me_1 = require("./app.about.me");
var routes = [
    { path: '', component: app_stmark_defautl_1.AppDefalt },
    { path: 'home', component: app_stmark_defautl_1.AppDefalt },
    { path: 'group', component: app_stmark_groups_1.AppGroup },
    { path: 'member', component: app_stmark_members_1.AppMembers },
    { path: 'hymns', component: app_stmark_hymns_1.AppHymns },
    { path: 'sch', component: app_stmark_schedule_1.AppSch },
    { path: 'schrpt', component: app_stmark_sch_rpt_1.AppSchRpt },
    { path: 'aboutme', component: app_about_me_1.AppAboutMe }
];
exports.MenuRoutes = router_1.RouterModule.forRoot(routes);
exports.MenuComponents = [app_stmark_defautl_1.AppDefalt, app_stmark_groups_1.AppGroup, app_stmark_members_1.AppMembers, app_stmark_hymns_1.AppHymns, app_stmark_schedule_1.AppSch, app_stmark_sch_rpt_1.AppSchRpt, app_about_me_1.AppAboutMe];
//# sourceMappingURL=app.routers.js.map