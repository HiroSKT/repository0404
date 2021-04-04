(function () {
    alert('hello');
    // ❶変数定義
    var canvas; //キャンバスオブジェクト。これはUIの設定に用いる？
    var ctx; //Ctxオブジェクト。これはイメージを描画するために使う？
    var img = {snow:null, snow_man:null}; //イメージ変数に雪と雪だるまを定義。中身はまだない。後でソースを指定してロードする。
    var snow_x = 0;　//雪の画像のX座標
    var snow_y = 0;
    var snow_man_x = 0; //雪だるまの画像のX座標
    var snow_man_y = 0;
    var requestId = 0; //？？？
    alert('変数定義完了');

    // ❷ドキュメントリスナー：イベントハンドラーの定義：
    document.addEventListener('DOMContentLoaded', function () {
        loadAssets();
        alert('DOMのロードが完了しました');
    });

    // ❸ロードアセット関数の定義：
    function loadAssets() {
        alert('loadAssets関数を実行しますか？');
        canvas = document.getElementById('bg');
        
        // キャンバスをクリックした時に，レンダーフレーむ関数を開始する
        canvas.addEventListener('click', function () {
            if (!requestId) {
                renderFrame();
            }
        });

        // Ctxオブジェクトの定義：キャンバスのコンテンツを２Dレンダリングコンテクストと定義している？
        ctx = canvas.getContext('2d');
        alert('ctx = canvas.getContext(2d)を実行し，キャンバスを２Dとして定義');
        
        // イメージスノーオブジェクトの定義→イメージソースのロード
        img.snow = new Image();
        img.snow.src = './img/snow.png';
        alert('img.snow.src = ./img/snow.pngを実行して，雪の画像をロードする');
        
        img.snow.onload = function () {
            snow_x = getCenterPosition(canvas.clientWidth, img.snow.width);
            ctx.drawImage(img.snow, snow_x, snow_y);  
            alert('ctx.drawImage(img.snow, snow_x, snow_y)を実行して，雪の画像を描画する');          
        };

        // ①新規イメージを読み込み→②イメージのソースパスを指定→③ロード中に関数を起動→④ｘ座標とｙ座標を取得→⑤イメージを描画
        img.snow_man = new Image();
        img.snow_man.src = './img/snow_man.png';
        alert('img.snow_man.src = ./img/snow_man.png;を実行して，雪だるまの画像をロードする');

        img.snow_man.onload = function () {
            snow_man_x = getCenterPosition(canvas.clientWidth, img.snow_man.width);
            snow_man_y = canvas.clientHeight - img.snow_man.height;
            alert('ctx.drawImage(img.snow_man, snow_man_x, snow_man_y);を実行して，雪だるまの画像を描画');
            ctx.drawImage(img.snow_man, snow_man_x, snow_man_y);
        };
    }
    
    // ❸ゲットセンターポジション関数の定義：画像の表示位置を指定する
    function getCenterPosition(containerWith, itemWith) {
        alert('GetCenterPosition関数を実行して，中心位置を取得しますか？');
        return (containerWith / 2) - (itemWith / 2);　
        // 表示画像の位置をリターンする
    }

    // ❹レンダーフレーム関数の定義：雪の落ちるアニメーションを実行する
    alert('RenderFrame関数を実行して，アニメーションを開始しますか？');
    alert('黒いキャンバスをクリックして，アニメーションを開始');
    
    function renderFrame() {
        if (snow_y > canvas.clientHeight) {
            snow_y = 0;
        }

        // クリアレクトは指定した長方形を透明色でクリアする。引数は，X座標，Y座標，横幅，高さ。
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snow_y += 20;
        
        ctx.drawImage(img.snow, snow_x, snow_y);
        ctx.drawImage(img.snow_man, snow_man_x, snow_man_y);

        // アニメーションの更新を促すメソッド。これがあると，一枚目が終了した後，連続して二枚目三名目のアニメーションが自動生成できる。これがないと，クリックなどのイベントを毎回発生させる必要がある。
        requestId = window.requestAnimationFrame(renderFrame);
    }

}) ();