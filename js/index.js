// 所有选项按钮
let optionsButtons = document.querySelectorAll('.option-button');
// 所有与文本选择有关的按钮(选择文本进行设置)
let advancedOptionButton = document.querySelectorAll('.adv-option-button');
// 所有对齐按钮
let alignButtons = document.querySelectorAll('.align');
// 所有缩进按钮
let spacingButtons = document.querySelectorAll('.spacing');
// 所有格式化按钮
let formarButtons = document.querySelectorAll('.format');
// 所有角标按钮
let scriptButtons = document.querySelectorAll('.script');

let fontName = document.querySelector('#fontName');
let fontSize = document.querySelector('#fontSize');
let writingArea = document.querySelector('#text-input');
let linkButton = document.querySelector('#createLink');
let unLinkButton = document.querySelector('#unLink');

// 字体列表
let fontList = ['Arial', 'Verdana', 'Times New Roman', 'Garamond', 'Georgia', 'Courier New', 'cursive'];

// 1. 初始化设置
const initializer = () => {
  // 1.2 文本样式按钮高亮的设置(列表 撤销 链接 是不需要设置高亮的 )
  highlighter(formarButtons, false);
  highlighter(scriptButtons, true);
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);

  // 1.3 设置字体名称的下拉选项
  fontList.forEach(font => {
    let option = document.createElement('option');
    option.value = font;
    option.innerHTML = font;
    fontName.appendChild(option);
  });
  // 1.4 设置字体大小的下拉选项
  for (let i = 1; i < 36; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    fontSize.appendChild(option);
  }
  // 1.5 设置默认字体的大小
  fontSize.value = 3;
};

// 2. 按钮高亮函数
const highlighter = (buttons, needsRemoval) => {
  // needsRemoval为true时: 表示需要移除将其它同类型按钮的高亮取消
  // needsRemoval为false时: 表示不需要移除其它同类型按钮的高亮,可同时高亮
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('button为', button);
      if (needsRemoval) {
        // needsRemoval为true: 不可以同时高亮, 包含以下两种情况
        // 2.2 字体对齐方式(左对齐 居中对齐 右对齐 只能选择其中一种对齐方式,即只能选择一种方式高亮)
        // 2.3 缩进方式(只能选择一种方式高亮)

        // 当前按钮若有active类,则为true(再次点击取消高亮),否则为false(点击添加高亮)
        let alreadyActive = button.classList.contains('active') ? true : false;
        // 移除所有按钮的高亮
        highlighterRemover(buttons);
        // 为当前按钮添加高亮(只有当按钮本没有被选中的时候)
        if (!alreadyActive) {
          button.classList.add('active');
        }
      } else {
        // needsRemoval为false:可同时高亮,点击时按钮之间不会相互影响
        // 2.1 字体样式(formarButtons:加粗 斜体 下划线 删除线 可以同时选中,即可以同时高亮)
        button.classList.toggle('active'); // 添加或者移除active类
        console.log(button.classList);
      }
    });
  });
};

window.addEventListener('load', () => {
  initializer();
});
// 3. 移除按钮高亮函数
const highlighterRemover = buttons => {
  buttons.forEach(button => {
    button.classList.remove('active');
  });
};

// 4. 修改输入框里面整个文本样式(使用 document.exexCommand(, , null))
const modifyText = (command, boolean, value) => {
  document.execCommand(command, boolean, value);
};

// 4.1 监听样式按钮是否被点击
optionsButtons.forEach(button => {
  // 4.2 若被点击,那么修改整个文本
  button.addEventListener('click', () => {
    modifyText(button.id, false, null);
  });
});

// 5. 修改输入框里面选中的文本样式(使用 document.exexCommand(, , value))
/* 若鼠标没有选中文字：document.execCommand会改变光标处后续的字体名称、字体大小、字体颜色、字体高亮
   若鼠标选中了部分文字：document.execCommand 只会改变选中文字的字体名称、字体大小，选中文字的字体颜色、字体高亮修改不生效*/
advancedOptionButton.forEach(button => {
  button.addEventListener('change', () => {
    console.log('change');
    modifyText(button.id, false, button.value);
  });
});

// 6. 为文字添加链接
linkButton.addEventListener('click', () => {
  console.log('链接为', linkButton);
  let userLink = prompt('Enter a URL');
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, true, userLink);
  } else {
    userLink = 'http://' + userLink;
    modifyText(linkButton.id, true, userLink);
  }
});
