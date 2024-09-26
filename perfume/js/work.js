function generatePerfume() {
    const description = document.getElementById('description').value;
    const resultDiv = document.getElementById('result');
    const output = document.getElementById('perfume-output');
    const noteBox = document.querySelector('.note-box');
    const textBox = document.querySelector('.text-box');
    const imgBox = document.querySelector('.bottle');
    const saveBtn = document.getElementById('saveBtn');
    const saveModal = document.getElementById('saveModal');
    const confirmSave = document.getElementById('confirmSave');
    const cancelSave = document.getElementById('cancelSave');
    const perfumeNameInput = document.getElementById('perfumeName');
    const closeModal = document.querySelector('.close');
    const generateButton = document.querySelector('.btn-2');
    
    // 定义香水的前调、中调、后调及成分的哈希表
    const fragranceData = {
        0: { topNote: 'Citrus', middleNote: 'Jasmine', baseNote: 'Sandalwood', ingredients: ['Alcohol', 'Water', 'Citrus', 'Jasmine', 'Sandalwood'] },
        1: { topNote: 'Bergamot', middleNote: 'Rose', baseNote: 'Vanilla', ingredients: ['Alcohol', 'Water', 'Bergamot', 'Rose', 'Vanilla'] },
        2: { topNote: 'Lavender', middleNote: 'Geranium', baseNote: 'Patchouli', ingredients: ['Alcohol', 'Water', 'Lavender', 'Geranium', 'Patchouli'] },
        3: { topNote: 'Lemon', middleNote: 'Ylang Ylang', baseNote: 'Musk', ingredients: ['Alcohol', 'Water', 'Lemon', 'Ylang Ylang', 'Musk'] },
        4: { topNote: 'Mandarin', middleNote: 'Iris', baseNote: 'Amber', ingredients: ['Alcohol', 'Water', 'Mandarin', 'Iris', 'Amber'] },
        5: { topNote: 'Orange Blossom', middleNote: 'Lily', baseNote: 'Cedarwood', ingredients: ['Alcohol', 'Water', 'Orange Blossom', 'Lily', 'Cedarwood'] },
        6: { topNote: 'Grapefruit', middleNote: 'Magnolia', baseNote: 'Oakmoss', ingredients: ['Alcohol', 'Water', 'Grapefruit', 'Magnolia', 'Oakmoss'] },
        7: { topNote: 'Peppermint', middleNote: 'Violet', baseNote: 'Tonka Bean', ingredients: ['Alcohol', 'Water', 'Peppermint', 'Violet', 'Tonka Bean'] },
        8: { topNote: 'Pineapple', middleNote: 'Freesia', baseNote: 'Benzoin', ingredients: ['Alcohol', 'Water', 'Pineapple', 'Freesia', 'Benzoin'] },
        9: { topNote: 'Apple', middleNote: 'Peony', baseNote: 'Leather', ingredients: ['Alcohol', 'Water', 'Apple', 'Peony', 'Leather'] }
    };

    // 将用户输入转换为哈希值的函数
    function generateHashFromInput(input) {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash += input.charCodeAt(i); // 累加字符的 Unicode 编码
        }
        return hash % Object.keys(fragranceData).length; // 根据哈希表的长度取模，防止越界
    }

    // 根据用户输入生成香水的前中后调和成分信息
    function generateFragranceFromInput(input) {
        const hashValue = generateHashFromInput(input); // 生成哈希值
        const fragrance = fragranceData[hashValue]; // 获取对应的香水信息

        // 更新 noteBox 的内容
        noteBox.innerHTML = `
            <div class="notes">
                <div class="note"><span class="label">Top Note</span> <span class="content">${fragrance.topNote}</span></div>
                <div class="note"><span class="label">Middle Note</span> <span class="content">${fragrance.middleNote}</span></div>
                <div class="note"><span class="label">Base Note</span> <span class="content">${fragrance.baseNote}</span></div>
            </div>
        `;

        // 动态更新成分信息
        output.innerHTML = `
            <p><strong>Contains:</strong> ${fragrance.ingredients.join(', ')}.</p>
        `;
    }

    // 定义一个预定义的颜色哈希表
    const colorData = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8333', '#33FFF1', '#8333FF', '#FFC300', '#C70039', '#900C3F',
        '#DAF7A6', '#FFC0CB', '#FFD700', '#808080', '#00FFFF', '#FF4500', '#6A5ACD', '#7FFF00', '#FF1493', '#D2691E'
    ];

    // 将用户输入转换为哈希值的函数，用于生成颜色索引
    function generateColorHashFromInput(input) {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash += input.charCodeAt(i); // 累加字符的 Unicode 编码
        }
        return hash % colorData.length; // 根据颜色表的长度取模，防止越界
    }

    // 根据用户输入生成三个颜色
    function generateColorsFromInput(input) {
        const hash1 = generateColorHashFromInput(input + "top-left");
        const hash2 = generateColorHashFromInput(input + "top-right");
        const hash3 = generateColorHashFromInput(input + "bottom");

        return {
            topLeft: colorData[hash1],
            topRight: colorData[hash2],
            bottom: colorData[hash3]
        };
    }

    // 生成并显示渐变色块
    function createGradientColorBlock(input) {
        const colors = generateColorsFromInput(input); // 获取三个颜色

        // 创建一个悬浮的色块元素
        const colorBlock = document.createElement('div');
        colorBlock.className = 'color-block'; // 设置色块的类名
        
        // 设置背景为渐变色，左上、右上、下中三个颜色
        colorBlock.style.background = `linear-gradient(to bottom right, ${colors.topLeft}, ${colors.topRight}, ${colors.bottom})`;

        // 将生成的色块添加到页面上
        imgBox.appendChild(colorBlock);
    }

    // 清除之前的"Try Again"按钮
    const tryAgainButton = document.querySelector('.btn-try-again');
    if (tryAgainButton) {
        tryAgainButton.remove();
    }

    // 判断是否输入描述
    if (description.trim() === "") {
        output.innerHTML = "Please enter a description.";
    } else {
        // 示例：根据用户输入生成香水信息
        const userInput = description.trim(); // 假设用户输入的文本
        generateFragranceFromInput(userInput);
        createGradientColorBlock(userInput);

        // 隐藏生成按钮，替换为“Try Again”按钮
        generateButton.style.display = 'none';

        // 创建按钮容器
        const btnBox = document.createElement('div');
        btnBox.className = 'btn-box'; // 设置按钮容器的类名

        // 创建“Try Again”按钮
        const tryAgainButton = document.createElement('button');
        tryAgainButton.className = 'btn-2'; // 设置按钮的类名
        tryAgainButton.id = 'tryAgainButton';
        tryAgainButton.textContent = 'Try Again'; // 设置按钮文本

        // 创建“Save”按钮
        const saveButton = document.createElement('button');
        saveButton.className = 'btn-2'; // 设置按钮的类名
        saveButton.id = 'saveBtn';
        saveButton.textContent = 'Save'; // 设置按钮文本

        // 将按钮添加到按钮容器
        btnBox.appendChild(tryAgainButton);
        btnBox.appendChild(saveButton);

        // 将按钮容器添加到文本框中
        textBox.appendChild(btnBox);

        // 绑定“Try Again”按钮的功能与 generatePerfume 相同
        tryAgainButton.addEventListener('click', () => {
            // 去除之前的“Try Again”按钮
            btnBox.remove(); // 移除按钮容器
            generatePerfume(); // 重新生成香水
        });

        // 动画：图片框左移，文字框右侧显示，移除淡入淡出效果，仅保留延迟
        const imgBox = document.querySelector('.img-bottle-box');
        imgBox.style.transition = 'transform 0.5s ease-in-out';
        imgBox.style.left = '40%';  // 左移图片

        // 延迟后显示文字
        const notesDiv = document.querySelector('.notes');
        notesDiv.style.display = 'block'; // 延迟显示
    
        saveButton.addEventListener('click', function() {
            alert('Perfume is saved successfully!');
        });

        
    }
    
    resultDiv.style.display = "block";
}

// 弹窗保存功能

