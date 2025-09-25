/**
 * Big Text Generator - 大字体生成器
 * JavaScript 功能实现
 */

// DOM 元素引用
const textInput = document.getElementById('text-input');
const fontSizeSlider = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const styleButtons = document.querySelectorAll('.style-btn');
const previewText = document.querySelector('.preview-text');
const copyBtn = document.getElementById('copy-btn');
const fontFamilySelect = document.getElementById('font-family');
const textColorPicker = document.getElementById('text-color');

// 全局状态
let currentStyle = 'bold'; // 默认样式为粗体
let currentFontSize = 60; // 默认字体大小

/**
 * 初始化应用
 */
function init() {
    try {
        // 设置默认值
        setDefaultValues();
        
        // 绑定事件监听器
        bindEventListeners();
        
        // 初始化预览
        updatePreview();
        
        console.log('Big Text Generator 初始化完成');
    } catch (error) {
        console.error('初始化失败:', error);
        showError('应用初始化失败，请刷新页面重试');
    }
}

/**
 * 设置默认值
 */
function setDefaultValues() {
    try {
        // 设置默认文字
        textInput.value = '输入你的文字';
        
        // 设置默认字体大小
        fontSizeSlider.value = currentFontSize;
        fontSizeValue.textContent = `${currentFontSize}px`;
        
        // 设置默认样式为粗体
        setActiveStyle('bold');
        
    } catch (error) {
        console.error('设置默认值失败:', error);
    }
}

/**
 * 绑定事件监听器
 */
function bindEventListeners() {
    try {
        // 文本输入实时更新
        textInput.addEventListener('input', handleTextInput);
        
        // 字体大小滑块
        fontSizeSlider.addEventListener('input', handleFontSizeChange);
        
        // 样式按钮点击
        styleButtons.forEach(button => {
            button.addEventListener('click', handleStyleChange);
        });
        
        // 复制按钮
        copyBtn.addEventListener('click', handleCopy);
        
        // 字体选择器
        fontFamilySelect.addEventListener('change', handleFontFamilyChange);
        
        // 颜色选择器
        textColorPicker.addEventListener('change', handleTextColorChange);
        
        // 键盘快捷键支持
        document.addEventListener('keydown', handleKeyboardShortcuts);
        
    } catch (error) {
        console.error('绑定事件监听器失败:', error);
    }
}

/**
 * 处理文本输入变化
 */
function handleTextInput(event) {
    try {
        const text = event.target.value;
        updatePreviewText(text);
    } catch (error) {
        console.error('处理文本输入失败:', error);
    }
}

/**
 * 处理字体大小变化
 */
function handleFontSizeChange(event) {
    try {
        const size = parseInt(event.target.value);
        currentFontSize = size;
        fontSizeValue.textContent = `${size}px`;
        updatePreviewSize(size);
    } catch (error) {
        console.error('处理字体大小变化失败:', error);
    }
}

/**
 * 处理样式切换
 */
function handleStyleChange(event) {
    try {
        const style = event.target.dataset.style;
        setActiveStyle(style);
        updatePreviewStyle(style);
    } catch (error) {
        console.error('处理样式切换失败:', error);
    }
}

/**
 * 设置激活的样式按钮
 */
function setActiveStyle(style) {
    try {
        // 移除所有按钮的激活状态
        styleButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // 激活当前样式按钮
        const activeButton = document.querySelector(`[data-style="${style}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            currentStyle = style;
        }
    } catch (error) {
        console.error('设置激活样式失败:', error);
    }
}

/**
 * 处理复制功能
 */
async function handleCopy() {
    try {
        const textToCopy = previewText.textContent;
        
        if (!textToCopy || textToCopy.trim() === '') {
            showMessage('没有文字可复制', 'warning');
            return;
        }
        
        // 使用现代 Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
            showMessage('复制成功！', 'success');
        } else {
            // 降级方案：使用传统方法
            fallbackCopyTextToClipboard(textToCopy);
        }
        
    } catch (error) {
        console.error('复制失败:', error);
        showMessage('复制失败，请手动选择文字复制', 'error');
    }
}

/**
 * 降级复制方案
 */
function fallbackCopyTextToClipboard(text) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showMessage('复制成功！', 'success');
        } else {
            throw new Error('execCommand 复制失败');
        }
    } catch (error) {
        console.error('降级复制方案失败:', error);
        showMessage('复制失败，请手动选择文字复制', 'error');
    }
}

/**
 * 处理键盘快捷键
 */
function handleKeyboardShortcuts(event) {
    try {
        // Ctrl/Cmd + C 复制
        if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
            if (document.activeElement === textInput) {
                return; // 如果焦点在输入框，使用默认复制行为
            }
            event.preventDefault();
            handleCopy();
        }
        
        // Ctrl/Cmd + Enter 切换样式
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            cycleThroughStyles();
        }
        
    } catch (error) {
        console.error('处理键盘快捷键失败:', error);
    }
}

/**
 * 循环切换样式
 */
function cycleThroughStyles() {
    try {
        const styles = ['normal', 'bold', 'shadow', 'outline', 'neon', 'gradient', 'rainbow', 'bubble', 'fire', 'ice'];
        const currentIndex = styles.indexOf(currentStyle);
        const nextIndex = (currentIndex + 1) % styles.length;
        const nextStyle = styles[nextIndex];
        
        setActiveStyle(nextStyle);
        updatePreviewStyle(nextStyle);
        
        showMessage(`切换到 ${getStyleDisplayName(nextStyle)} 样式`, 'info');
    } catch (error) {
        console.error('循环切换样式失败:', error);
    }
}

/**
 * 处理字体选择变化
 */
function handleFontFamilyChange(event) {
    try {
        const fontFamily = event.target.value;
        updatePreviewFontFamily(fontFamily);
    } catch (error) {
        console.error('处理字体选择变化失败:', error);
    }
}

/**
 * 处理文字颜色变化
 */
function handleTextColorChange(event) {
    try {
        const color = event.target.value;
        updatePreviewColor(color);
    } catch (error) {
        console.error('处理文字颜色变化失败:', error);
    }
}

/**
 * 更新预览字体
 */
function updatePreviewFontFamily(fontFamily) {
    try {
        if (previewText) {
            previewText.style.fontFamily = fontFamily;
        }
    } catch (error) {
        console.error('更新预览字体失败:', error);
    }
}

/**
 * 更新预览颜色
 */
function updatePreviewColor(color) {
    try {
        if (previewText) {
            // 对于某些样式，颜色可能被覆盖，所以需要特殊处理
            if (currentStyle === 'gradient' || currentStyle === 'rainbow') {
                // 渐变和彩虹样式不应用颜色
                return;
            }
            previewText.style.color = color;
        }
    } catch (error) {
        console.error('更新预览颜色失败:', error);
    }
}

/**
 * 获取样式显示名称
 */
function getStyleDisplayName(style) {
    const styleNames = {
        'normal': '普通',
        'bold': '粗体',
        'shadow': '阴影',
        'outline': '轮廓',
        'neon': '霓虹',
        'gradient': '渐变',
        'rainbow': '彩虹',
        'bubble': '气泡',
        'fire': '火焰',
        'ice': '冰霜'
    };
    return styleNames[style] || style;
}

/**
 * 更新预览文字内容
 */
function updatePreviewText(text) {
    try {
        if (previewText) {
            previewText.textContent = text || '输入你的文字';
        }
    } catch (error) {
        console.error('更新预览文字失败:', error);
    }
}

/**
 * 更新预览字体大小
 */
function updatePreviewSize(size) {
    try {
        if (previewText) {
            previewText.style.fontSize = `${size}px`;
        }
    } catch (error) {
        console.error('更新预览字体大小失败:', error);
    }
}

/**
 * 更新预览样式
 */
function updatePreviewStyle(style) {
    try {
        if (previewText) {
            // 移除所有样式类
            previewText.className = 'preview-text';
            
            // 添加新样式类
            previewText.classList.add(style);
            
            // 特殊样式处理
            if (style === 'bold') {
                previewText.style.letterSpacing = '2px';
            } else {
                previewText.style.letterSpacing = 'normal';
            }
        }
    } catch (error) {
        console.error('更新预览样式失败:', error);
    }
}

/**
 * 更新完整预览
 */
function updatePreview() {
    try {
        updatePreviewText(textInput.value);
        updatePreviewSize(currentFontSize);
        updatePreviewStyle(currentStyle);
    } catch (error) {
        console.error('更新预览失败:', error);
    }
}

/**
 * 显示消息提示
 */
function showMessage(message, type = 'info') {
    try {
        // 移除现有提示
        const existingMessage = document.querySelector('.message-toast');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 创建新提示
        const messageEl = document.createElement('div');
        messageEl.className = `message-toast message-${type}`;
        messageEl.textContent = message;
        
        // 添加样式
        Object.assign(messageEl.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // 设置背景色
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        messageEl.style.backgroundColor = colors[type] || colors.info;
        
        // 添加到页面
        document.body.appendChild(messageEl);
        
        // 显示动画
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 2000);
        
    } catch (error) {
        console.error('显示消息失败:', error);
        // 降级方案：使用 alert
        alert(message);
    }
}

/**
 * 显示错误信息
 */
function showError(message) {
    showMessage(message, 'error');
}

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 导出函数供测试使用（如果存在模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        updatePreview,
        showMessage,
        debounce,
        throttle
    };
}
