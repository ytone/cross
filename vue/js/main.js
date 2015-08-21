var size = 3;

function getFirstTable() {
    var table = [];
    var cols = [];
    for (var i = 0; i < size; i++) {
        cols = [];
        for (var j = 0; j < size; j++) {
            cols.push({value: ""});
        }
        table.push({cols: cols});
    }
    return table;
}

var cross = new Vue({
    el:'#demo',
    data: {
        turn: "O",
        turnList: ["O", "X"],
        turnIndex: 1,
        rows: getFirstTable(),
    },
    methods: {
        onClick: function (e) {
            if (e.targetVM.value != "") {
                alert('Already taken');
                return false;
            }
            e.targetVM.value = cross.$data.turn;
            if (cross.decide() === true) {
                alert(cross.$data.turn + ' Win');
                return false;
            }
            cross.$data.turn = cross.$data.turnList[cross.$data.turnIndex % cross.$data.turnList.length];
            cross.$data.turnIndex++;
        },

        //勝ち負け判定
        decide: function () {
            var detectArray = [];
            // 縦
            for (var c = 0; c < size; c++) {
                var colValue = [];
                for (var r = 0; r < size; r++) {
                    colValue.push(cross.$data.rows[r].cols[c].value);
                }
                detectArray.push(colValue);
            }

            // 横
            for (var r = 0; r < size; r++) {
                var cols = cross.$data.rows[r].cols;
                colValue = [];
                for (var c = 0; c < size; c++) {
                    colValue.push(cols[c].value);
                }
                detectArray.push(colValue);
            }

            // 斜め左上から右下
            colValue = [];
            for (var i = 0; i < size; i++) {
                colValue.push(cross.$data.rows[i].cols[i].value);
            }
            detectArray.push(colValue);

            // 斜め右上から左下
            colValue = [];
            var j;
            for (var i = 0; i < size; i++) {
                j = size - i - 1;
                colValue.push(cross.$data.rows[i].cols[j].value);
            }
            detectArray.push(colValue);

            // 3連続か判定
            for (var i = 0; i < detectArray.length; i++) {
                if (cross.isSame(detectArray[i]) == true) {
                    return true;
                }
            }

            return false;
        },

        isSame: function (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "") {
                    return false;
                }
            }
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] != arr[0]) {
                    return false;
                }
            }

            return true;
        },

        reset: function () {
            cross.$data.turnIndex = 1;
            cross.$data.turn = cross.$data.turnList[0];
            cross.$data.rows = getFirstTable();
        },
    }
});
