(function(){
    // 如果已存在，先移除（避免重复）
    const ROOT_ID = '__shadcn_inject_root__';
    const HTML_STR = `
__HTML_REPLACE_STR__
    `;
    const existing = document.getElementById(ROOT_ID);
    if (existing) {
        existing.remove();
        console.log('旧面板已移除');
    }
    else {
        console.log('旧面板不存在');
    }
    // 创建 iframe
    const iframe = document.createElement('iframe');
    iframe.id = ROOT_ID;
    // 全屏覆盖样式
    Object.assign(iframe.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: '0',
        padding: '0',
        zIndex: '2147483647',        // 最大安全 z-index
        background: '#fff'
    });
    // 插入到页面
    document.documentElement.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(HTML_STR);

    console.log(`全屏 iframe 已创建，ID: ${ROOT_ID}`);
})();