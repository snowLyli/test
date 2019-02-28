<template>
    <div class="conBox">
        <div>敬请期待</div>
        <group-add :ifGroupAdd="ifGroupAdd" :visible.sync="ifGroupAdd"></group-add>
        <relation-link :ifRelation="ifRelation" :visible.sync="ifRelation"></relation-link>
        <room-link :ifRoomRelation="ifRoomRelation" :visible.sync="ifRoomRelation"></room-link>
    </div>
</template>
<script>
import GroupAdd from "@/components/property/dialog/groupAdd"
import RelationLink from "@/components/property/dialog/relationLink"
import RoomLink from "@/components/property/dialog/roomLink"
export default {
    data(){
        return{
            // 组添加
            ifGroupAdd: false,
            // 关联关系管理
            ifRelation: false,
            // 机房管理
            ifRoomRelation: false,
        }
    },
    mounted(){

    },
    methods:{

    },
    components:{
        GroupAdd,
        RelationLink,
        RoomLink
    }
}
</script>
<style>

</style>
