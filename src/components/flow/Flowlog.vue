<template>
    <div class="flowlogPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Fcentent contents">
            <div class="switchBox">
                <div class="switch" @click="refreshByself">
                    <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
                </div>
            </div>
            <div class="Flogs">
                <ul class="logsTitle">
                    <li v-for="(item, index) in titles" :key="index"
                        :class="item.showFlag ? 'titles preShow' : 'titles'"
                        @click="preShow(index)">
                        {{item.name}}
                    </li>
                </ul>
                <div :class="titles[0].showFlag ? 'logsContent curList' : 'logsContent'">
                    <div class="makeList">
                        <el-select v-model="item.value" placeholder="请选择" v-for="(item, index) in firstLog"
                                   :key="index" @change="changeFirstList">
                            <el-option v-for="item in item.options" :key="item.value" :label="item.label"
                                       :value="item.value"
                                       :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="logsList">
                        <el-table :data="initFirstList" stripe style="width: 100%"
                                  :row-style="{height: '35px'}"
                                  :default-sort = "{prop: 'date', order: 'descending'}"
                                  :header-cell-style="{
                                      'background-color': '#666',
                                      'color': '#fff',
                                      'border-right': '1px #888 solid',
                                      'border-bottom': 'none',
                                      'height': '40px',
                                      'padding': '5px'
                                  }">
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <ul class="otherListBox">
                                        <li v-for="(item, index) in firstOtherList[scope.$index]" 
                                            :key="index" class="otherListItem">
                                            <span>{{item.name}}：</span><span>{{item.value}}</span>
                                        </li>
                                    </ul>
                                </template>
                            </el-table-column>
                            <el-table-column :prop="firstListTitle[0].labelValue" 
                                             :label="firstListTitle[0].label"></el-table-column>
                            <el-table-column :prop="firstListTitle[1].labelValue" 
                                             :label="firstListTitle[1].label" sortable></el-table-column>
                            <el-table-column :prop="firstListTitle[2].labelValue" 
                                             :label="firstListTitle[2].label" sortable></el-table-column>
                            <el-table-column :prop="firstListTitle[3].labelValue" 
                                             :label="firstListTitle[3].label" sortable></el-table-column>
                            <el-table-column :prop="firstListTitle[4].labelValue" 
                                             :label="firstListTitle[4].label" sortable></el-table-column>
                            <el-table-column :prop="firstListTitle[5].labelValue" 
                                             :label="firstListTitle[5].label" sortable></el-table-column>
                            <el-table-column :prop="firstListTitle[6].labelValue" 
                                             :label="firstListTitle[6].label" sortable></el-table-column>
                            <el-table-column :prop="firstListTitle[7].labelValue" 
                                             :label="firstListTitle[7].label" sortable></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div :class="titles[1].showFlag ? 'logsContent curList' : 'logsContent'">
                    <div class="makeList">
                        <el-select v-model="item.value" placeholder="请选择" v-for="(item, index) in secondLog"
                                   :key="index" @change="changeSecondList">
                            <el-option v-for="item in item.options" :key="item.value" :label="item.label"
                                       :value="item.value"
                                       :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="logsList">
                        <el-table :data="initSecondList" stripe style="width: 100%"
                                  :row-style="{height: '35px'}"
                                  :default-sort = "{prop: 'date', order: 'descending'}"
                                  :header-cell-style="{
                                      'background-color': '#666',
                                      'color': '#fff',
                                      'border-right': '1px #888 solid',
                                      'border-bottom': 'none',
                                      'height': '40px',
                                      'padding': '5px'
                                  }">
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <ul class="otherListBox">
                                        <li v-for="(item, index) in secondOtherList[scope.$index]" 
                                            :key="index" class="otherListItem">
                                            <span>{{item.name}}：</span><span>{{item.value}}</span>
                                        </li>
                                    </ul>
                                </template>
                            </el-table-column>
                            <el-table-column :prop="secondListTitle[0].labelValue" 
                                             :label="secondListTitle[0].label"></el-table-column>
                            <el-table-column :prop="secondListTitle[1].labelValue" 
                                             :label="secondListTitle[1].label" sortable></el-table-column>
                            <el-table-column :prop="secondListTitle[2].labelValue" 
                                             :label="secondListTitle[2].label" sortable></el-table-column>
                            <el-table-column :prop="secondListTitle[3].labelValue" 
                                             :label="secondListTitle[3].label" sortable></el-table-column>
                            <el-table-column :prop="secondListTitle[4].labelValue" 
                                             :label="secondListTitle[4].label" sortable></el-table-column>
                            <el-table-column :prop="secondListTitle[5].labelValue" 
                                             :label="secondListTitle[5].label" sortable></el-table-column>
                            <el-table-column :prop="secondListTitle[6].labelValue" 
                                             :label="secondListTitle[6].label" sortable></el-table-column>
                            <el-table-column :prop="secondListTitle[7].labelValue" 
                                             :label="secondListTitle[7].label" sortable></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div :class="titles[2].showFlag ? 'logsContent curList' : 'logsContent'">
                    <div class="makeList">
                        <el-select v-model="item.value" placeholder="请选择" v-for="(item, index) in thirdLog"
                                   :key="index" @change="changeThirdList">
                            <el-option v-for="item in item.options" :key="item.value" :label="item.label"
                                       :value="item.value"
                                       :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="logsList">
                        <el-table :data="initThirdList" stripe style="width: 100%"
                                  :row-style="{height: '35px'}"
                                  :default-sort = "{prop: 'date', order: 'descending'}"
                                  :header-cell-style="{
                                      'background-color': '#666',
                                      'color': '#fff',
                                      'border-right': '1px #888 solid',
                                      'border-bottom': 'none',
                                      'height': '40px',
                                      'padding': '5px'
                                  }">
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <ul class="otherListBox">
                                        <li v-for="(item, index) in thirdOtherList[scope.$index]" 
                                            :key="index" class="otherListItem">
                                            <span>{{item.name}}：</span><span>{{item.value}}</span>
                                        </li>
                                    </ul>
                                </template>
                            </el-table-column>
                            <el-table-column :prop="thirdListTitle[0].labelValue" 
                                             :label="thirdListTitle[0].label"></el-table-column>
                            <el-table-column :prop="thirdListTitle[1].labelValue" 
                                             :label="thirdListTitle[1].label" sortable></el-table-column>
                            <el-table-column :prop="thirdListTitle[2].labelValue" 
                                             :label="thirdListTitle[2].label" sortable></el-table-column>
                            <el-table-column :prop="thirdListTitle[3].labelValue" 
                                             :label="thirdListTitle[3].label" sortable></el-table-column>
                            <el-table-column :prop="thirdListTitle[4].labelValue" 
                                             :label="thirdListTitle[4].label" sortable></el-table-column>
                            <el-table-column :prop="thirdListTitle[5].labelValue" 
                                             :label="thirdListTitle[5].label" sortable></el-table-column>
                            <el-table-column :prop="thirdListTitle[6].labelValue" 
                                             :label="thirdListTitle[6].label" sortable></el-table-column>
                            <el-table-column :prop="thirdListTitle[7].labelValue" 
                                             :label="thirdListTitle[7].label" sortable></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div :class="titles[3].showFlag ? 'logsContent curList' : 'logsContent'">日志四</div>
                <div :class="titles[4].showFlag ? 'logsContent curList' : 'logsContent'">日志五</div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
export default {
    data(){
        return{
            publicText: "流量日志",
            // 是否刷新页面
            refreshFlag: false,

            // 日志标题数据
            titles: [
                {
                    showFlag: true,
                    name: "日志一"
                },
                {
                    showFlag: false,
                    name: "日志二"
                },
                {
                    showFlag: false,
                    name: "日志三"
                },
                {
                    showFlag: false,
                    name: "日志四"
                },
                {
                    showFlag: false,
                    name: "日志五"
                }
            ],

            // 日志一数据
            firstList: [],
            firstOtherList: [],
            initFirstList: [
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                }
            ],
            // 选择框数据
            firstLog: [],
            // 列表表头数据
            firstListTitle: [],

            // 日志二数据
            secondList: [],
            secondOtherList: [],
            initSecondList: [
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                }
            ],
            // 选择框数据
            secondLog: [],
            // 列表表头数据
            secondListTitle: [],

            // 日志三
            thirdList: [],
            thirdOtherList: [],
            initThirdList: [
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                },
                {
                    applyType: "北京",
                    flowRatio: "210Gbps",
                    upFlow: "400Gbps",
                    downFlow: "500Gbps",
                    doubleFlow: "100Gbps",
                    upAll: "400Gbps",
                    downAll: "500Gbps",
                    doubleAll: "350Gbps",
                    test0: "00000",
                    test1: "11111",
                    test2: "22222",
                    test3: "33333",
                    test4: "44444",
                    test5: "55555",
                    test6: "66666",
                    test7: "77777",
                    test8: "88888",
                    test9: "99999"
                }
            ],
            // 选择框数据
            thirdLog: [],
            // 列表表头数据
            thirdListTitle: [],

            // 显示对应列表
            showList: 0
        }
    },
    created(){
        this.initLog()
    },
    mounted(){
        this.initOtherList(this.initFirstList, this.firstOtherList, this.firstListTitle)
        this.initOtherList(this.initSecondList, this.secondOtherList, this.secondListTitle)
        this.initOtherList(this.initThirdList, this.thirdOtherList, this.thirdListTitle)
    },
    methods: {
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },

        // 显示当前选中列表标题
        preShow(num){
            this.titles.map((item, index) => {
                if(index == num){
                    this.titles[index].showFlag = true
                }else{
                    this.titles[index].showFlag = false
                }
            })
            this.showList = num
        },

        // 初始列表隐藏数据
        initOtherList(findArr, aimArr, comArr){
            var len = aimArr.length
            for(var i=0;i<len;i++){
                aimArr.pop()
            }
            findArr.map((item, index) => {
                var arr = []
                for(var item in findArr[index]){
                    var flag = true
                    comArr.map((itm, idx) => {
                        if(item == itm.labelValue){
                            flag = false
                        }
                    })
                    if(flag){
                        var itemObj = {
                            name: item,
                            value: findArr[index][item]
                        }
                        arr.push(itemObj)
                    }
                }
                aimArr.push(arr)
            })
        },
        // 所有列表选项:模拟数据
        initLog(){
            var allArr = []
            // 有几分日志就循环几次
            for(var j=0;j<3;j++){
                var itemArr = []
                for(var i=0;i<8;i++){
                    var itemObj = {
                        options: [],
                        value: "选项" + i
                    }
                    itemArr.push(itemObj)
                }
                allArr.push(itemArr)
            }
            // 将每一份日志中的选择框内都添加数据
            allArr.map((item, index) => {
                item.map((itm, idx) => {
                    // 20为实际数据字段数
                    for(var i=0;i<20;i++){
                        var itemObj = {
                            value: "选项" + i,
                            label: "选项" + i,
                            labelValue: "test" + i,
                            disabled: false
                        }
                        itm.options.push(itemObj)
                    }
                })
            })
            // 将每一份数据赋值给对应日志所代表的变量
            this.firstLog = allArr[0]
            this.secondLog = allArr[1]
            this.thirdLog = allArr[2]
            // 初始列表表头数据
            for(var i=0;i<8;i++){
                this.firstListTitle.push(this.firstLog[0].options[i])
                this.secondListTitle.push(this.secondLog[0].options[i])
                this.thirdListTitle.push(this.thirdLog[0].options[i])
            }
            this.changeFirstList()
            this.changeSecondList()
            this.changeThirdList()
        },
        // 选择列表表头数据操作方法
        changeFirstList(){
            var valueData = []
            // 获取所有选择框内的数据
            this.firstLog.map((item, index) => {
                valueData.push(item.value)
            })
            // 控制禁用选项
            this.firstLog.map((item,index) => {
                item.options.map((itm, idx) => {
                    itm.disabled = false
                    for(var i=0;i<valueData.length;i++){
                        if(itm.value == valueData[i]){
                            itm.disabled = true
                        }
                    }
                })
            })
            // 根据选中内容改变表头的值
            valueData.map((item, index) => {
                if(item){
                    this.firstListTitle[index].label = item
                }
            })
            // 根据表头数据的变化，更新数据
            this.firstListTitle.map((item, index) => {
                this.firstLog[index].options.map((itm, idx) => {
                    if(item.label == itm.label){
                        item.labelValue = itm.labelValue
                    }
                })
            })
            this.initOtherList(this.initFirstList, this.firstOtherList, this.firstListTitle)
        },
        changeSecondList(){
            var valueData = []
            // 获取所有选择框内的数据
            this.secondLog.map((item, index) => {
                valueData.push(item.value)
            })
            // 控制禁用选项
            this.secondLog.map((item,index) => {
                item.options.map((itm, idx) => {
                    itm.disabled = false
                    for(var i=0;i<valueData.length;i++){
                        if(itm.value == valueData[i]){
                            itm.disabled = true
                        }
                    }
                })
            })
            // 根据选中内容改变表头的值
            valueData.map((item, index) => {
                if(item){
                    this.secondListTitle[index].label = item
                }
            })
            // 根据表头数据的变化，更新数据
            this.secondListTitle.map((item, index) => {
                this.secondLog[index].options.map((itm, idx) => {
                    if(item.label == itm.label){
                        item.labelValue = itm.labelValue
                    }
                })
            })
            this.initOtherList(this.initSecondList, this.secondOtherList, this.secondListTitle)
        },
        changeThirdList(){
            var valueData = []
            // 获取所有选择框内的数据
            this.thirdLog.map((item, index) => {
                valueData.push(item.value)
            })
            // 控制禁用选项
            this.thirdLog.map((item,index) => {
                item.options.map((itm, idx) => {
                    itm.disabled = false
                    for(var i=0;i<valueData.length;i++){
                        if(itm.value == valueData[i]){
                            itm.disabled = true
                        }
                    }
                })
            })
            // 根据选中内容改变表头的值
            valueData.map((item, index) => {
                if(item){
                    this.thirdListTitle[index].label = item
                }
            })
            // 根据表头数据的变化，更新数据
            this.thirdListTitle.map((item, index) => {
                this.thirdLog[index].options.map((itm, idx) => {
                    if(item.label == itm.label){
                        item.labelValue = itm.labelValue
                    }
                })
            })
            this.initOtherList(this.initThirdList, this.thirdOtherList, this.thirdListTitle)
        }
    },
    components: {
        NavBar
    }
}
</script>

<style>
/* 日志主要内容盒子样式 */
.flowlogPage .Fcentent .Flogs{
    width:100%;
    min-height:600px;
    background:rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 5px rgba(135,134,163,1);
}
/* 各日志标题样式 */
.flowlogPage .Fcentent .Flogs .logsTitle{
    width:100%;
    height:50px;
    border-bottom:2px solid #ddd;
}
/* 个日志名称所在容器样式 */
.flowlogPage .Fcentent .Flogs .logsTitle .titles{
    width:100px;
    height:100%;
    line-height:50px;
    border-right:2px solid #ddd;
    text-align:center;
    color:#333;
    font-size:18px;
    float:left;
    cursor:pointer;
}
/* 选中后的样式 */
.preShow{
    line-height:52px;
    border-bottom:2px solid #fff;
}
/* 列表内主要内容样式设置 */
.flowlogPage .Fcentent .Flogs .logsContent{
    width:100%;
    padding:15px;
    box-sizing: border-box;
    display:none;
}
.flowlogPage .Fcentent .Flogs .curList{
    display:block;
}
/* 选择列表所需项选择框样式 */
.flowlogPage .Fcentent .Flogs .logsContent .makeList{
    width:100%;
    height:40px;
    margin-bottom:10px;
    padding: 5px;
    box-sizing: border-box;
}
.flowlogPage .Fcentent .Flogs .logsContent .logsList .otherListBox{
    width:100%;
    overflow: hidden;
}
.flowlogPage .Fcentent .Flogs .logsContent .logsList .otherListBox .otherListItem{
    width: 200px;
    margin-right: 5px;
    float: left;
    width: 200px;
    margin-right: 5px;
    margin-bottom: 5px;
    float: left;
    height: 20px;
    line-height: 20px;
    text-align:left;
}
</style>
