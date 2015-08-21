var table = [];
var size = 3;
var cols = [];
for (var i = 0; i < size; i++) {
    cols = [];
    for (var j = 0; j < size; j++) {
        cols.push({value: ""});
    }
    table.push({cols: cols});
}

var cross = new Vue({
    el:'#demo',
    data: {
        turn: "O",
        turnList: ["O", "X"],
        turnIndex: 1,
        rows: table,
    },
    methods: {
        onClick: function (e) {
            if (e.targetVM.value != "") {
                alert('Already taken');
                return false;
            }
            e.targetVM.value = cross.$data.turn;
            cross.$data.turn = cross.$data.turnList[cross.$data.turnIndex % cross.$data.turnList.length];
            if (cross.decide() === true) {
                alert('You Win');
                return false;
            }
            cross.$data.turnIndex++;
        },

        //勝ち負け判定
        decide: function () {
            //横
            for (var r = 0; r < cross.$data.rows.length; r++) {
                var cols = cross.$data.rows[r].cols;
                for (var i = 1; i < cols.length; i++) {
                    if (cols[0].value != cols[i].value) {
                        return false;
                    }
                }
                return true;
            }
        },

        reset: function () {
            cross.$data.turnIndex = 1;
            cross.$data.turn = cross.$data.turnList[cross.$data.turnIndex];
            cross.$data.rows = table;
        }
    }
});
