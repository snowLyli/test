<template>
    <div class="LoadPage">
        <div class="failed">
            {{msg}}
        </div>
    </div>
</template>

<script>
export default {
    props: ["msg"]
}
</script>

<style>
.LoadPage{
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    background:rgba(10,10,10,0.9);
    z-index:999;
}
.LoadPage .failed{
    width:300px;
    height:150px;
    border:2px solid rgba(51, 5, 216, 0.8);
    background:#fff;
    text-align:center;
    line-height: 150px;
    font-size:20px;
    color:#000;
    border-radius:5px;
    position:absolute;
    left:50%;
    top: 23%;
    margin-left:-150px;
}
</style>
