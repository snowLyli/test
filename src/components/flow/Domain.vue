<template>
    <div class="domainPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="DOcentent contents">
            <div class="switchBox">
                <div class="switch" @click="refreshByself">
                    <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
                </div>
            </div>
            <div class="DOtop structure">
                <div class="DOleft boxes">
                    <h6>流量趋势</h6>
                    <div class="mainLine boxContent">
                        <span class="label">时间:</span>
                        <el-select v-model="domTimeValue" filterable placeholder="请选择"
                                    @change="getLimitTime(domTimeValue, 'DomainLine', domLineValue, FlowLine, 'Gbps')">
                            <el-option v-for="item in domTimeOptions" :key="item.value"
                                    :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                        <el-date-picker v-model="domDateValue" type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        v-if="domTimeValue == '自定义'"
                                        @change="selectLimitTime(domDateValue, 'DomainLine', domLineValue, FlowLine, 'Gbps')">
                        </el-date-picker>
                        <span class="label">域名:</span>
                        <el-input :placeholder="domLineValue" clearable v-model="domLineValue"
                                  @blur="changeDomain(domTimeValue, 'DomainLine', FlowLine, domLineValue, domDateValue, 'Gbps')"></el-input>
                        <div id="DomainLine"></div>
                    </div>
                </div>
                <div class="DOright boxes">
                    <h6>访问次数趋势</h6>
                    <div class="mainLine boxContent">
                        <span class="label">时间：</span>
                        <el-select v-model="visTimeValue" filterable placeholder="请选择"
                                   @change="getLimitTime(visTimeValue, 'VisitLine', visLineValue, VisitLine, '次数')">
                            <el-option v-for="item in visTimeOptions" :key="item.value"
                                       :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                        <el-date-picker v-model="visDateValue" type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        v-if="visTimeValue == '自定义'"
                                        @change="selectLimitTime(visDateValue, 'VisitLine', visLineValue, VisitLine, '次数')">
                        </el-date-picker>
                        <span class="label">域名:</span>
                        <el-input :placeholder="visLineValue" clearable v-model="visLineValue"
                                  @blur="changeDomain(visDateValue, 'VisitLine', VisitLine, visLineValue, visDateValue, '次数')"></el-input>
                        <div id="VisitLine"></div>
                    </div>
                </div>
            </div>
            <div class="DObottom structure boxes">
                <h6>域名流量详细统计</h6>
                <div class="domainList boxContent">
                    <div class="searchBox">
                        <el-input placeholder="域名" clearable v-model="domainValue"
                                  @keyup.native="selectDomain"></el-input>
                        <span class="searchBtn btn" style="cursor:pointer;" @click="selectDomain">搜索</span>
                        <span class="resetBtn btn" style="cursor:pointer;" @click="allDomain">重置</span>
                        <div class="domainBlock">
                            <el-pagination @size-change="handleDomain"
                                           @current-change="handleDomainCurrent"
                                           :current-page="currentPage"
                                           :page-sizes="[5,10,15,20]"
                                           :page-size="domainEveryPage"
                                           layout="total, sizes, prev, pager, next, jumper" :total="allDomainListData">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="detailList">
                        <el-table :data="domainList" stripe style="width: 100%"
                                  :row-style="{height: '37px'}"
                                  :default-sort = "{prop: 'date', order: 'descending'}"
                                  :header-cell-style="{
                                      'background-color': '#666',
                                      'color': '#fff',
                                      'border-right': '1px #888 solid',
                                      'border-bottom': 'none',
                                      'height': '40px',
                                  }">
                            <el-table-column type="expand" width="20">
                                <template slot-scope="props">
                                    <div style="box-sizing:border-box;overflow:hidden">
                                        <div class="cityList">
                                            <el-table :data="props.row.types" stripe style="width: 100%"
                                                      :row-style="{height: '30px'}"
                                                      :default-sort = "{prop: 'date', order: 'descending'}" 
                                                      :header-cell-style="{
                                                            'background-color': '#888',
                                                            'color': '#fff',
                                                            'border-right': '1px #999 solid',
                                                            'height': '30px',
                                                      }" :show-header="false">
                                                <el-table-column prop="flowType" label="流量类型"></el-table-column>
                                                <el-table-column prop="domainName" label="域名"></el-table-column>
                                                <el-table-column prop="upFlow" label="上行实时流量" sortable width="130"></el-table-column>
                                                <el-table-column prop="downFlow" label="下行实时流量" sortable width="130"></el-table-column>
                                                <el-table-column prop="doubleFlow" label="双向实时流量" sortable width="130"></el-table-column>
                                                <el-table-column prop="upAll" label="上行总流量" sortable width="110"></el-table-column>
                                                <el-table-column prop="downAll" label="下行总流量" sortable width="110"></el-table-column>
                                                <el-table-column prop="doubleAll" label="双向总流量" sortable width="110"></el-table-column>
                                                <el-table-column prop="visitTimes" label="访问次数" sortable width="110"></el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>       
                            <el-table-column prop="domainType" label="域名分类"></el-table-column>
                            <el-table-column prop="flowType" label="流量类型"></el-table-column>
                            <el-table-column prop="domainName" label="域名"></el-table-column>
                            <el-table-column prop="upFlow" label="上行实时流量" sortable width="130"></el-table-column>
                            <el-table-column prop="downFlow" label="下行实时流量" sortable width="130"></el-table-column>
                            <el-table-column prop="doubleFlow" label="双向实时流量" sortable width="130"></el-table-column>
                            <el-table-column prop="upAll" label="上行总流量" sortable width="110"></el-table-column>
                            <el-table-column prop="downAll" label="下行总流量" sortable width="110"></el-table-column>
                            <el-table-column prop="doubleAll" label="双向总流量" sortable width="110"></el-table-column>
                            <el-table-column prop="visitTimes" label="访问次数" sortable width="110"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            publicText: "网站访问流量",
            refreshFlag: false,

            // 流量趋势图表数据
            FlowLine: {
                type: "line",
                xData: ["8:00","8:10","8:20","8:30","8:40","8:50"],
                series: [
                    {
                        data: [50,56,45,26,67,44],
                        name: "HTTP流量"
                    },
                    {
                        data: [100,156,145,126,167,144],
                        name: "邮件流量"
                    },
                    {
                        data: [200,256,245,226,267,244],
                        name: "FTP流量"
                    },
                    {
                        data: [300,356,345,326,367,344],
                        name: "DNS流量"
                    },
                    {
                        data: [400,456,445,426,467,444],
                        name: "总流量"
                    }
                ],
                legend: [],
                yName: "Gbps"
            },
            // 流量趋势选择框数据
            domTimeOptions: [
                {
                    value: "选项1",
                    label: "1小时内"
                },
                {
                    value: "选项2",
                    label: "24小时内"
                },
                {
                    value: "选项3",
                    label: "7天内"
                },
                {
                    value: "选项4",
                    label: "自定义"
                },
            ],
            // 流量趋势选择后的时间值
            domTimeValue: "1小时内",
            domDateValue: "",
            // 流量趋势输入域名后的值
            domLineValue: "domain",

            // 访问次数趋势图表数据
            VisitLine: {
                xData: ["8:00","8:10","8:20","8:30","8:40","8:50"],
                series: [
                        {
                            data: [50,56,45,26,67,44],
                            name: "HTTP流量"
                        },
                        {
                            data: [100,156,145,126,167,144],
                            name: "邮件流量"
                        },
                        {
                            data: [200,256,245,226,267,244],
                            name: "FTP流量"
                        },
                        {
                            data: [300,356,345,326,367,344],
                            name: "DNS流量"
                        },
                        {
                            data: [400,456,445,426,467,444],
                            name: "总流量"
                        }
                    ],
                legend: [],
                yName: "次数"
            },
            // 访问次数时间选择框数据
            visTimeOptions: [
                {
                    value: "选项1",
                    label: "1小时内"
                },
                {
                    value: "选项2",
                    label: "24小时内"
                },
                {
                    value: "选项3",
                    label: "7天内"
                },
                {
                    value: "选项4",
                    label: "自定义"
                },
            ],
            // 访问次数选择时间值
            visTimeValue: "1小时内",
            visDateValue: "",
            // 访问次数趋势输入域名后的值
            visLineValue: "domain",

            // 列表可操作数据
            domainList: [],
            // 列表初始数据
            initDomainList: [
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "asaf",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "fasdfa",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "aaaaa",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "dfsg",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "rwgsvzda",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "sgtrgfh",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "baidu",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "baidu",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "baidu",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                },
                {
                    domainType: "type",
                    flowType: "总流量",
                    domainName: "baidu",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    visitTimes: 5,
                    types: [
                        {
                            flowType: "HTTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "DNS流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "邮件流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        },
                        {
                            flowType: "FTP流量",
                            domainName: "asaf",
                            upFlow: "400Gbps",
                            downFlow: "500Gbps",
                            doubleFlow: "100Gbps",
                            upAll: "400Gbps",
                            downAll: "500Gbps",
                            doubleAll: "350Gbps",
                            visitTimes: 5,
                        }
                    ]
                }
            ],
            // 输入的域名值
            domainValue: "",
            // 默认显示的页数
            currentPage: 1,
            // 流量归属地区列表数据总条数
            allDomainListData: 0,
            // 流量地区列表默认每页显示数据条数
            domainEveryPage: 10,
        }
    },
    mounted(){
        // 绘制流量趋势线图
        this.drawDomainLine(this.FlowLine, "DomainLine", 0, 100)
        // 绘制访问次数趋势线图
        this.drawDomainLine(this.VisitLine, "VisitLine", 0, 100)
        // 制作域名统计列表
        this.initList(this.initDomainList, this.domainList)
        // 获取两个列表数据总个数
        this.getAllData()
    },
    methods: {
        // 模拟数据
        random(max, min){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 是否开启自动刷新
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },
        
        // 绘制曲线图
        drawDomainLine(obj, id, start, end){
            let Mychart = this.$echarts.init(document.getElementById(id))
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left:"10%",
                    top: "20%",
                    right: "6%",
                    bottom: "30%"
                },
                dataZoom: [
                    {
                        type: "inside",
                        start: start,
                        end: end
                    }, 
                    {
                        start: start,
                        end: end,
                        handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                        handleSize: "80%",
                        handleStyle: {
                            color: "#fff",
                            shadowBlur: 3,
                            shadowColor: "rgba(0, 0, 0, 0.6)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        zoomLock: true
                    }
                ],
                legend: {
                    data: [
                        {
                            name: "HTTP流量",
                            icon: "rect"
                        },
                        {
                            name: "DNS流量",
                            icon: "rect"
                        },
                        {
                            name: "邮件流量",
                            icon: "rect"
                        },
                        {
                            name: "FTP流量",
                            icon: "rect"
                        },
                        {
                            name: "总流量",
                            icon: "rect"
                        }
                    ],
                    textStyle: {
                        color: "#999"
                    },
                    itemWidth: 20,
                    itemHeight: 2
                },
                xAxis: {
                    type: "category",
                    data: obj.xData,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                        color: "#999"
                        }
                    },
                    axisLabel: {
                        color: "#999"
                    },
                    boundaryGap : false,
                },
                yAxis: {
                    type: "value",
                    name: obj.yName,
                    nameTextStyle: {
                        color: "#999",
                        padding:[0,0,0,-30]
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        label: {
                            textStyle: {
                                color: "#999"
                            },
                        }
                    },
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: "{value}",
                        color: "#999"
                    }
                },
                series: [
                    {
                        data: obj.series[0].data,
                        type: "line",
                        name: "HTTP流量",
                        symbol: "none",
                        smooth: true
                    },
                    {
                        data: obj.series[1].data,
                        type: "line",
                        name: "DNS流量",
                        symbol: "none",
                        smooth: true
                    },
                    {
                        data: obj.series[2].data,
                        type: "line",
                        name: "邮件流量",
                        symbol: "none",
                        smooth: true
                    },
                    {
                        data: obj.series[3].data,
                        type: "line",
                        name: "FTP流量",
                        symbol: "none",
                        smooth: true
                    },
                    {
                        data: obj.series[4].data,
                        type: "line",
                        name: "总流量",
                        symbol: "none",
                        smooth: true
                    }
                ]
          };
          Mychart.setOption(option)

          //用于使chart自适应高度和宽度
          window.onresize = function() {
            Mychart.resize()
          }
        },
        // 获取选择时间数据
        getLimitTime(value, id, domValue, changeObj, yName){
            var timeLimit = OtherFunction.getLimitTime(value)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(value)[0]
                var now = OtherFunction.getLimitTime(value)[1]
                this.changeData(changeObj, id, domValue, start, now, yName)
            }
        },
        selectLimitTime(value, id, domValue, changeObj, yName){
            var start = OtherFunction.getTime(value[0], "y", false)
            var now = OtherFunction.getTime(value[1], "y", false)
            this.changeData(changeObj, id, domValue, start, now, yName)
        },
        // 获取选择类型数据
        changeDomain(timeValue, id, changeObj, domValue, dateValue, yName){
            var timeLimit = OtherFunction.getLimitTime(timeValue)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(timeValue)[0]
                var now = OtherFunction.getLimitTime(timeValue)[1]
                this.changeData(changeObj, id, domValue, start, now, yName)
            }else{
                if(dateValue.length){
                    var start = OtherFunction.getTime(dateValue[0], "y", false)
                    var now = OtherFunction.getTime(dateValue[1], "y", false)
                    this.changeData(changeObj, id, domValue, start, now, yName)
                }else{
                    alert("请选择时间范围")
                } 
            }
        },
        // 改变图表数据
        changeData(changeObj, id, domValue, start, end, yName){
            // 存放新数据
            var newData = {
                type: "line",
                xData: [],
                series: [
                    {
                        data: []
                    },
                    {
                        data: []
                    },
                    {
                        data: []
                    },
                    {
                        data: []
                    },
                    {
                        data: []
                    }
                ],
                yName: yName
            }
            // 计算时间差
            var startCom = new Date(start)
            var endCom = new Date(end)
            var diff = parseInt((endCom.getTime() - startCom.getTime())/(1000*60))
            // 改变数据
            var itemTime = new Date(end)
            for(var i=0;i<parseInt(diff/10)+1;i++){
                var xItem = OtherFunction.getTime(itemTime,"y",false)
                newData.xData.unshift(xItem.replace(" ","\n"))
                // 模拟数据：请求数据时需要开始时间、结束时间和域名3个参数
                newData.series[0].data.unshift(this.random(50,100))
                newData.series[1].data.unshift(this.random(100,200))
                newData.series[2].data.unshift(this.random(200,300))
                newData.series[3].data.unshift(this.random(300,400))
                newData.series[4].data.unshift(this.random(400,500))
                itemTime = new Date(itemTime.getTime()-1000*60*10)
            }
            if(parseInt(diff/(60*24)) >= 7){
                this.drawDomainLine(newData, id, 0, 5)
            }else if(parseInt(diff/60) >= 12){
                this.drawDomainLine(newData, id, 0, 50)
            }else{
                this.drawDomainLine(newData, id, 0, 100)
            }   
        },

        // 列表数据
        initList(origin, aim){
            for(var i=0;i<this.domainEveryPage;i++){
                aim.push(origin[i])
            }
        },
        // 根据输入的省份名称进行搜索
        selectDomain(){
            var newDomainData = []
            if(this.domainValue != ""){
                this.initDomainList.map((item, index) => {
                    if(item.domainName.search(this.domainValue) != -1){
                        newDomainData.push(item)
                    }
                })
                this.domainList = newDomainData
            }else{
                this.domainList = []
                this.initList(this.initDomainList, this.domainList)
            }
        },
        // 点击重置按钮，将所有数据显示
        allDomain(){
            this.domainList = []
            this.provinceValue = ""
            this.domainEveryPage = 10
            this.initList(this.initDomainList, this.domainList)
        },
        // 获取两个列表数据总数
        getAllData(){
            this.allDomainListData = this.initDomainList.length
        },
        // 域名统计列表选择当前列表每页显示数据的条数
        handleDomain(val) {
            this.domainEveryPage = val
            this.domainList = []
            for(var i=0;i<val;i++){
                this.domainList.push(this.initDomainList[i])
            }
        },
        // 域名统计列表输入将要跳转的页数
        handleDomainCurrent(val) {
            this.domainList = []
            var start = (val-1)*this.domainEveryPage
            var end = val*this.domainEveryPage
            if(end > this.allDomainListData){
                end = this.allDomainListData
            }
            for(var i=start;i<end;i++){
                this.domainList.push(this.initDomainList[i])
            }
        }
    },
    components: {
        NavBar
    }
}
</script>

<style>
/* 页面模块样式 */
.domainPage .DOcentent .DOtop{
    height:330px;
}
.domainPage .DOcentent .DObottom{
    min-height:300px;
}
.domainPage .DOcentent .DOtop .DOleft{
    width:50%;
    height:100%;
    margin-right:20px;
    float:left;
}
.domainPage .DOcentent .DOtop .DOright{
    width:48%;
    height:100%;
    float:right;
}

/* 模块内容图表样式 */
.domainPage .DOcentent .DOtop .DOleft .mainLine #DomainLine,
.domainPage .DOcentent .DOtop .DOright .mainLine #VisitLine{
    width: 100%;
    height:85%;
}
.domainPage .DOcentent .DOtop .DOleft .mainLine .label,
.domainPage .DOcentent .DOtop .DOright .mainLine .label{
    font-size:12px;
}

/* 列表样式 */
.domainPage .DOcentent .DObottom .domainList .detailList{
    margin-bottom:10px;
}
/* 搜索框样式 */
.domainPage .DOcentent .DObottom .domainList .searchBox{
    width:100%;
    height: 30px;
    border-radius:3px;
    margin-bottom:10px;
}
.domainPage .DOcentent .DObottom .domainList .searchBox .searchBtn,
.domainPage .DOcentent .DObottom .domainList .searchBox .resetBtn{
    width: 40px;
    height: 20px;
}
.domainPage .DOcentent .DObottom .domainList .searchBox .domainBlock{
    height: 30px;
    text-align:center;
    float:right;
}
</style>
