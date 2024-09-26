function generatePerfume() {
    const description = document.getElementById('description').value;
    const resultDiv = document.getElementById('result');
    const output = document.getElementById('perfume-output');
    const noteBox = document.querySelector('.note-box');
    const textBox = document.querySelector('.text-box');
    const generateButton = document.querySelector('.btn-2');
    
    // 清除之前的"Try Again"按钮
    const tryAgainButton = document.querySelector('.btn-try-again');
    if (tryAgainButton) {
        tryAgainButton.remove();
    }

    // 判断是否输入描述
    if (description.trim() === "") {
        output.innerHTML = "Please enter a description.";
    } else {
        // 前调、中调、后调信息
    noteBox.innerHTML = `
            <div class="notes">
                <div class="note"><span class="label">Top Note</span> <span class="content">Citrus</span></div>
                <div class="note"><span class="label">Middle Note</span> <span class="content">Jasmine</span></div>
                <div class="note"><span class="label">Base Note</span> <span class="content">Sandalwood</span></div>
            </div>
        `;

        // 添加成分信息
        output.innerHTML = `
            <p><strong>Contains:</strong> Alcohol, Water, Fragrance oils (Citrus, Jasmine, Sandalwood).</p>
        `;

        // 隐藏生成按钮，替换为“Try Again”按钮
        generateButton.style.display = 'none';
        const newTryAgainButton = document.createElement('button');
        newTryAgainButton.className = 'btn-2 btn-try-again';
        newTryAgainButton.textContent = 'Try Again';
        textBox.appendChild(newTryAgainButton);

        // 绑定“Try Again”按钮的功能与 generatePerfume 相同
        newTryAgainButton.addEventListener('click', generatePerfume);

        // 动画：图片框左移，文字框右侧显示，移除淡入淡出效果，仅保留延迟
        const imgBox = document.querySelector('.img-bottle-box');
        imgBox.style.transition = 'transform 0.5s ease-in-out';
        imgBox.style.left = '40%';  // 左移图片

        // 延迟后显示文字
        const notesDiv = document.querySelector('.notes');
        notesDiv.style.display = 'block'; // 延迟显示
    }

    resultDiv.style.display = "block";
}
