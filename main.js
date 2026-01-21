//HTMLの部品を取得
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

//ToDOの本体（配列）
let todos = [];

//追加ボタンが押されたとき
addBtn.addEventListener('click', () => {
    const text = input.value;

    //何も書いていなければここで処理終了
    if (text === '') {
        return;
    }

    //配列todosに文字を追加
    todos.push(text);

    //入力欄を空に戻す
    input.value = '';

    saveTodos();
    renderTodos();
});

    //ToDoを画面に表示
function renderTodos() {

    //表示を一旦すべて消す（バグが起こりにくい）
    todoList.innerHTML = '';

    //配列を１つずつ見る
    todos.forEach((todo, index) => {

        //<li>をJSで作る
        const li = document.createElement('li');
        li.textContent = todo;

        //削除ボタンを作る
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '\u524A\u9664'; // '削除'

        //削除ボタンが押されたときの処理
        deleteBtn.addEventListener('click', () => {

            //配列から１個消す（index番目を削除）
            todos.splice(index, 1);

            saveTodos();
            renderTodos();
        });

            //liの中にボタンを入れる
            li.appendChild(deleteBtn);

        //ulの中にliを入れる
        todoList.appendChild(li);
        });
}

//localStorageに保存
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//localstorageから読み込み
function loadTodos() {

    //ブラウザから'todos'のデータを取得
    const saved = localStorage.getItem('todos');

    //もしsavedにデータがあったら（初めて開いたときや削除で空の時にエラーをなくすため）
    if (saved) {

        //配列を復元（文字列→配列）
        todos = JSON.parse(saved);

        renderTodos();
    }
}

//ページを開いたときに実行
loadTodos();
