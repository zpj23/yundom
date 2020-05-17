/*****************************************************************************
维稳系统选择对话框js对象 ljn

依赖：jquery，jquery_dialog

*****************************************************************************/
var StableDialog = {

    "retIDs": "",

    "retNames": "",

    //年初项目导入帮助
    importHelp: function (url) {
        JqueryDialog.Open1('年初项目导入帮助', url, 500, 300, null, null);
    },

    //信息报送-报告
    xxbs_report: function (url) {
        JqueryDialog.Open1('风险评估工作报告', url, 650, 700, null, null);
    },


    //导入年初项目
    ProjectYearImport: function (url) {
        JqueryDialog.Open1('年初项目导入', url, 400, 150, null, null);
    },
    //导入涉稳人员
    importPersonList: function (url) {
        JqueryDialog.Open1('涉稳人员导入', url, 400, 150, null, null);
    },
    //执行评估方案时添加涉稳事件
    zxpgfa: function (url) {
        JqueryDialog.Open1('涉稳群体性事端信息采集', url, 1000, 570, null, null);
    },

    //个案考评
    gakp: function (url) {
        JqueryDialog.Open1('稳评项目工作绩效考核评分', url, 800, 500, null, null);
    },
    //日常考核
    rckh: function (url) {
        JqueryDialog.Open1('稳评项目工作绩效考核评分', url, 800, 400, null, null);
    },
    //日常办公考核
    rcbgkh: function (url) {
        JqueryDialog.Open1('稳评项目工作绩效考核评分', url, 1000, 400, null, null);
    },
    //事件办理
    banli: function (url) {
        JqueryDialog.Open2('事件办理', url, 600, 400, null, null);
    },
    //查看绩效考核详细
    ViewJXKH: function (url) {
        JqueryDialog.Open2('项目评分详情', url, 600, 400, null, null);
    },
    //涉稳事件入库
    ruku: function (url) {
        JqueryDialog.Open1('涉稳事件入库', url, 400, 200, null, null);
    },
    //涉稳人员入库
    ruku2: function (url) {
        JqueryDialog.Open1('涉稳人员入库', url, 400, 200, null, null);
    },
    //风险源点评
    fengxuanyuan_dianping: function (url) {
        JqueryDialog.Open1('涉稳事件点评', url, 800, 400, null, null);
    },
    //风险源浏览
    fengxuanyuan_liulan: function (url) {
        JqueryDialog.Open1('涉稳事件点评', url, 800, 400, null, null);
    },



    //风险源办理
    fengxuanyuan_banli: function (url) {
        JqueryDialog.Open1('涉稳事件办理', url, 800, 500, null, null);
    },


    //风险源办结结果查看
    fengxuanyuan_banjie: function (url) {
        JqueryDialog.Open1('风险源办结结果', url, 800, 500, null, null);
    },
    //事件-项目关联
    guanlian: function (url) {
        JqueryDialog.Open1('事件-项目关联', url, 1000, 500, null, null);
    },
    //涉稳人员点评
    ryanli_dianping: function (url) {
        JqueryDialog.Open1('涉稳人员点评', url, 600, 400, null, null);
    },
    //涉稳人员浏览
    ryanli_liulan: function (url) {
        JqueryDialog.Open1('涉稳人员管控', url, 800, 500, null, null);
    },
    //人员-事件关联
    guanlian2: function (url) {
        JqueryDialog.Open1('人员-事件关联', url, 1000, 500, null, null);
    },
    //选择涉稳人员（单选）
    ChooseRISKPerson: function (ids, names, sex, mobile) {
        JqueryDialog.ChooseRiskPerson('选择涉稳人员（单选）', '/dialogs/chooseRISKPerson.aspx', 620, 340, ids, names, sex, mobile);
    },
    //临时录入涉稳人员
    AddRISKPerson: function (ids, names, sex, mobile) {
        JqueryDialog.AddRISKPerson('临时录入涉稳人员', '/dialogs/AddRiskPerson.aspx', 420, 260, ids, names, sex, mobile);
    },
    //选择涉稳事件（多选）
    ChooseRISKEvents: function (ids, names) {
        JqueryDialog.Open2('选择涉稳事件（多选）', '/dialogs/chooseRISKEvents.aspx', 900, 620, ids, names);
    },

    //选择组织机构(单选)
    chooseOrgSingle: function (ids, names) {
        JqueryDialog.Open2('选择组织机构(单选)', '/dialogs/chooseOrgSingle.aspx', 600, 400, ids, names);
    },

    //选择组织机构(多选)
    chooseOrgMul: function (ids, names) {
        JqueryDialog.Open2('选择组织机构(多选)', '/dialogs/chooseOrgMul.aspx', 600, 400, ids, names);
    },

    //选择部门(单选)
    chooseDeptSingle: function (ids, names) {
        JqueryDialog.Open2('选择部门(单选)', '/dialogs/chooseDeptSingle.aspx', 600, 400, ids, names);
    },

    //选择用户(多选)
    chooseUserMul: function (ids, names) {
        JqueryDialog.Open2('选择用户(多选)', '/dialogs/chooseUserMul.aspx', 800, 400, ids, names);
    },

    //选择事件(单选)
    chooseTempinfoSingle: function (ids, names) {
        JqueryDialog.Open2('选择事件(单选)', '/dialogs/chooseTempinfoSingle.aspx', 600, 400, ids, names);
    },

    //选择角色(多选)
    chooseRoleMul: function (ids, names) {
        JqueryDialog.Open2('选择角色(多选)', '/dialogs/chooseRoleMul.aspx', 600, 400, ids, names);
    },
    //选择节点(多选)
    chooseNBPM_ActivityDefinition: function (ids, names, ad_id, pd_id) {
        JqueryDialog.Open2('选择节点(多选)', '/dialogs/chooseActivityDefinition.aspx?ad_id=' + ad_id + '&pd_id=' + pd_id, 600, 400, ids, names);
    },
    //当前流程选择节点(单选)
    chooseThisProcessActivity: function (ids, names) {
        JqueryDialog.Open2('选择节点(单选)', '/dialogs/chooseThisProcessActivity.aspx', 600, 400, ids, names);
    },
    //自定义关联控件
    chooseControlSingle: function (ids, names, tableid, _originalname) {
        JqueryDialog.Open2('自定义关联控件', '/dialogs/chooseControlSingle.aspx?control_name=' + _originalname + '&table_id=' + tableid, 600, 390, ids, names);
    },

    //自定义控件
    customControl: function (ids, names, title, url) {
        JqueryDialog.Open2(title, url, 800, 390, ids, names);
    },

    //选择自定义主表
    chooseMasterTable: function (ids, names, type) {
        JqueryDialog.Open2('选择自定义主表', '/dialogs/chooseTableMaster.aspx?type=' + type, 600, 390, ids, names);
    },


    //选择自定义子表
    chooseChildTable: function (ids, names) {
        JqueryDialog.Open2('选择自定义子表', '/dialogs/chooseTableChilds.aspx', 600, 390, ids, names);
    },

    //选择某自定义表的字段
    chooseTableFields: function (ids, names, tablename) {
        JqueryDialog.Open2('选择字段', '/dialogs/chooseTableFields.aspx?tablename=' + tablename, 600, 390, ids, names);
    },

    //选择流程表单
    chooseFlowTable: function (ids, names, ModuleCode) {
        JqueryDialog.Open2('选择流程表单(单选)', '/dialogs/chooseTableFlow.aspx?ModuleCode=' + ModuleCode, 600, 390, ids, names);
    },

    //老人选择器
    chooseOldPeopleSingle: function (ids, names) {
        JqueryDialog.Open2('老人选择器', '/dialogs/chooseOldPeopleSingle.aspx', 800, 400, ids, names);
    },
    //专职选择器
    chooseJJYL_ServicePersonSingle: function (ids, names) {
        JqueryDialog.Open2('专职选择器', '/dialogs/chooseJJYL_ServicePersonSingle.aspx?type=FULLTIME', 800, 450, ids, names);
    },
    //兼职选择器
    chooseJJYL_ServicePersonSingle2: function (ids, names) {
        JqueryDialog.Open2('兼职选择器', '/dialogs/chooseJJYL_ServicePersonSingle.aspx?type=PARTTIME', 800, 450, ids, names);
    },
    //服务情况
    showUserServiceInfo: function (ubid) {
        JqueryDialog.Open1('服务情况', 'ShowUserServiceInfo.aspx?UB_ID=' + ubid, 800, 450, null, null);
    },
    //地图定位
    chooseBaiDuMap: function (ids, names) {
        JqueryDialog.Open2('地图定位', '/dialogs/BaiDuMap.aspx', 620, 420, ids, names);
    },
    //成功
    success: function (page) {
        JqueryDialog.OpenRedirectAlert('保存成功', '/dialogs/success.aspx?jumpto=' + page, 300, 200);
    }
};
