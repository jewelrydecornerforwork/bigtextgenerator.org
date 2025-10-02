/**
 * Big Text Generator - 大字体生成器
 * JavaScript 功能实现
 */

// DOM 元素引用
const textInput = document.getElementById('text-input');
const fontSizeSlider = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const styleButtons = document.querySelectorAll('.effect-btn');
const styleCopyButtons = document.querySelectorAll('.style-copy-btn');
const textSizeSlider = document.getElementById('text-size-slider');
const textSizeValue = document.getElementById('text-size-value');
const copyBtn = document.getElementById('copy-btn');
const fontFamilySelect = document.getElementById('font-family');
const textColorPicker = document.getElementById('text-color');
const exportPngBtn = document.getElementById('export-png-btn');
const exportJpgBtn = document.getElementById('export-jpg-btn');
const exportSvgBtn = document.getElementById('export-svg-btn');
const exportPdfBtn = document.getElementById('export-pdf-btn');
const exportOptions = document.getElementById('export-options');
const exportSize = document.getElementById('export-size');
const exportBg = document.getElementById('export-bg');
const customBgColor = document.getElementById('custom-bg-color');
const textAnimation = document.getElementById('text-animation');
const savePrefsBtn = document.getElementById('save-prefs-btn');
const loadPrefsBtn = document.getElementById('load-prefs-btn');
const resetPrefsBtn = document.getElementById('reset-prefs-btn');

// 全局状态
let currentStyle = 'bold'; // 默认样式为粗体
let currentFontSize = 60; // 默认字体大小

/**
 * 初始化应用
 */
function init() {
    try {
        // 性能优化：使用requestAnimationFrame
        requestAnimationFrame(() => {
        // 设置默认值
        setDefaultValues();
        
        // 初始化文字大小
        if (textSizeSlider && textSizeValue) {
            textSizeValue.textContent = textSizeSlider.value;
        }
            
            // 绑定事件监听器
            bindEventListeners();
            
            // 初始化预览
            updatePreview();
            
            // 添加淡入动画
            document.body.classList.add('fade-in');
            
            console.log('Big Text Generator 初始化完成');
        });
        
        // 预加载关键字体
        preloadFonts();
        
    } catch (error) {
        console.error('初始化失败:', error);
        showError('Application initialization failed, please refresh the page');
    }
}

/**
 * 预加载关键字体
 */
function preloadFonts() {
    try {
        const criticalFonts = [
            'Inter',
            'Poppins',
            'Roboto'
        ];
        
        criticalFonts.forEach(fontName => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;600;700&display=swap`;
            link.as = 'style';
            document.head.appendChild(link);
        });
    } catch (error) {
        console.error('预加载字体失败:', error);
    }
}

/**
 * 设置默认值
 */
function setDefaultValues() {
    try {
        // 设置默认文字为空
        textInput.value = '';
        
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
        
        // 效果按钮点击
        styleButtons.forEach(button => {
            button.addEventListener('click', handleStyleChange);
        });
        
        // 样式复制按钮点击
        styleCopyButtons.forEach(button => {
            button.addEventListener('click', handleStyleCopy);
        });
        
        // 文字大小滑块
        if (textSizeSlider) {
            textSizeSlider.addEventListener('input', handleTextSizeChange);
        }
        
        
        // 复制按钮
        copyBtn.addEventListener('click', handleCopy);
        
        
        // 字体选择器
        fontFamilySelect.addEventListener('change', handleFontFamilyChange);
        
        // 颜色选择器
        textColorPicker.addEventListener('change', handleTextColorChange);
        
        // 导出按钮
        exportPngBtn.addEventListener('click', () => handleExport('png'));
        exportJpgBtn.addEventListener('click', () => handleExport('jpg'));
        exportSvgBtn.addEventListener('click', () => handleExport('svg'));
        exportPdfBtn.addEventListener('click', () => handleExport('pdf'));
        
        // 导出选项
        exportBg.addEventListener('change', handleExportBgChange);
        customBgColor.addEventListener('change', handleCustomBgColorChange);
        
        // 动画选择器
        textAnimation.addEventListener('change', handleAnimationChange);
        
        // 偏好设置按钮
        savePrefsBtn.addEventListener('click', handleSavePreferences);
        loadPrefsBtn.addEventListener('click', handleLoadPreferences);
        resetPrefsBtn.addEventListener('click', handleResetPreferences);
        
        // 导航按钮
        const helpBtn = document.getElementById('help-btn');
        const premiumBtn = document.getElementById('premium-btn');
        
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                showMessage('Help documentation coming soon!', 'info');
            });
        }
        
        if (premiumBtn) {
            premiumBtn.addEventListener('click', () => {
                showMessage('Premium features coming soon!', 'info');
            });
        }
        
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
        
        // 清除艺术文字效果
        clearArtisticStyles();
    } catch (error) {
        console.error('处理样式切换失败:', error);
    }
}

/**
 * 处理样式复制
 */
async function handleStyleCopy(event) {
    try {
        const style = event.target.dataset.style;
        const styleCard = event.target.closest('.artistic-style-card');
        const stylePreview = styleCard.querySelector('.style-preview');
        
        if (stylePreview) {
            const textToCopy = stylePreview.textContent;
            
            if (!textToCopy || textToCopy.trim() === '') {
                showMessage('No text to copy', 'warning');
                return;
            }
            
            // 使用现代 Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
                showMessage(`Copied "${style}" style text!`, 'success');
            } else {
                // 降级方案：使用传统方法
                fallbackCopyTextToClipboard(textToCopy);
                showMessage(`Copied "${style}" style text!`, 'success');
            }
        }
    } catch (error) {
        console.error('处理样式复制失败:', error);
        showMessage('Failed to copy text', 'error');
    }
}

/**
 * 处理文字大小变化
 */
function handleTextSizeChange(event) {
    try {
        const size = event.target.value;
        if (textSizeValue) {
            textSizeValue.textContent = size;
        }
        
        // 更新所有样式预览的字体大小
        const stylePreviews = document.querySelectorAll('.style-preview');
        stylePreviews.forEach(preview => {
            preview.style.fontSize = `${size}px`;
        });
    } catch (error) {
        console.error('处理文字大小变化失败:', error);
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
 * 设置激活的艺术文字样式按钮
 */
function setActiveArtisticStyle(style) {
    try {
        // 移除所有艺术文字按钮的激活状态
        artisticCopyButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // 激活当前艺术文字样式按钮
        const activeButton = document.querySelector(`[data-style="${style}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            currentStyle = style;
        }
    } catch (error) {
        console.error('设置激活艺术文字样式失败:', error);
    }
}

/**
 * 清除艺术文字效果
 */
function clearArtisticStyles() {
    try {
        if (previewText) {
            const artisticClasses = [
                'gothic-reverie', 'gentle-calligraphy', 'gothic-intrigue',
                'monospace-elegance', 'modern-blockade', 'urban-square',
                'modern-clarity', 'vintage-script'
            ];
            artisticClasses.forEach(cls => previewText.classList.remove(cls));
        }
    } catch (error) {
        console.error('清除艺术文字效果失败:', error);
    }
}

/**
 * 清除普通文字效果
 */
function clearNormalStyles() {
    try {
        if (previewText) {
            const normalClasses = [
                'normal', 'bold', 'shadow', 'outline', 'neon',
                'gradient', 'rainbow', 'bubble', 'fire', 'ice'
            ];
            normalClasses.forEach(cls => previewText.classList.remove(cls));
        }
    } catch (error) {
        console.error('清除普通文字效果失败:', error);
    }
}

/**
 * 更新预览艺术文字样式
 */
function updatePreviewArtisticStyle(style) {
    try {
        if (previewText) {
            // 清除所有样式类
            const allStyleClasses = [
                'normal', 'bold', 'shadow', 'outline', 'neon',
                'gradient', 'rainbow', 'bubble', 'fire', 'ice',
                'gothic-reverie', 'gentle-calligraphy', 'gothic-intrigue',
                'monospace-elegance', 'modern-blockade', 'urban-square',
                'modern-clarity', 'vintage-script', 'symbolic-essence'
            ];
            allStyleClasses.forEach(cls => previewText.classList.remove(cls));
            
            // 添加新的艺术文字样式
            if (style && style !== 'normal') {
                previewText.classList.add(style);
            }
        }
    } catch (error) {
        console.error('更新预览艺术文字样式失败:', error);
    }
}

/**
 * 处理复制功能
 */
async function handleCopy() {
    try {
        const textToCopy = previewText.textContent;
        
        if (!textToCopy || textToCopy.trim() === '') {
            showMessage('No text to copy', 'warning');
            return;
        }
        
        // 使用现代 Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
            showMessage('Copied successfully!', 'success');
        } else {
            // 降级方案：使用传统方法
            fallbackCopyTextToClipboard(textToCopy);
        }
        
    } catch (error) {
        console.error('复制失败:', error);
        showMessage('Copy failed, please select text manually', 'error');
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
            showMessage('Copied successfully!', 'success');
        } else {
            throw new Error('execCommand copy failed');
        }
    } catch (error) {
        console.error('降级复制方案失败:', error);
        showMessage('Copy failed, please select text manually', 'error');
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
        
        showMessage(`Switched to ${getStyleDisplayName(nextStyle)} style`, 'info');
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
        
        // 更新颜色值显示
        const colorValue = document.querySelector('.color-value');
        if (colorValue) {
            colorValue.textContent = color.toUpperCase();
        }
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
        'normal': 'Normal',
        'bold': 'Bold',
        'shadow': 'Shadow',
        'outline': 'Outline',
        'neon': 'Neon',
        'gradient': 'Gradient',
        'rainbow': 'Rainbow',
        'bubble': 'Bubble',
        'fire': 'Fire',
        'ice': 'Ice',
        'gothic-reverie': 'Gothic Reverie',
        'gentle-calligraphy': 'Gentle Calligraphy',
        'gothic-intrigue': 'Gothic Intrigue',
        'monospace-elegance': 'Monospace Elegance',
        'modern-blockade': 'Modern Blockade',
        'urban-square': 'Urban Square',
        'modern-clarity': 'Modern Clarity',
        'vintage-script': 'Vintage Script',
        'symbolic-essence': 'Symbolic Essence',
        'harmonic-essence': 'Harmonic Essence',
        'classic-reverie': 'Classic Reverie'
    };
    return styleNames[style] || style;
}

/**
 * 更新预览文字内容
 */
function updatePreviewText(text) {
    try {
        if (previewText) {
            previewText.textContent = text || 'Hello World';
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
 * 处理导出背景变化
 */
function handleExportBgChange(event) {
    try {
        const bgType = event.target.value;
        if (bgType === 'custom') {
            customBgColor.style.display = 'block';
        } else {
            customBgColor.style.display = 'none';
        }
    } catch (error) {
        console.error('处理导出背景变化失败:', error);
    }
}

/**
 * 处理自定义背景颜色变化
 */
function handleCustomBgColorChange(event) {
    try {
        // 可以在这里添加实时预览功能
        console.log('自定义背景颜色:', event.target.value);
    } catch (error) {
        console.error('处理自定义背景颜色变化失败:', error);
    }
}

/**
 * 处理图片导出
 */
async function handleExport(format) {
    try {
        showMessage('Generating image...', 'info');
        
        // 显示导出选项
        exportOptions.style.display = 'block';
        
        // 等待用户调整设置（这里简化处理，直接导出）
        setTimeout(() => {
            exportImage(format);
        }, 1000);
        
    } catch (error) {
        console.error('处理导出失败:', error);
        showMessage('Export failed, please try again', 'error');
    }
}

/**
 * 导出图片
 */
function exportImage(format) {
    try {
        const scale = parseInt(exportSize.value);
        const bgType = exportBg.value;
        const bgColor = bgType === 'custom' ? customBgColor.value : 
                       bgType === 'white' ? '#ffffff' : 
                       bgType === 'black' ? '#000000' : 'transparent';
        
        // 创建Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 获取预览元素的样式
        const previewElement = previewText;
        const computedStyle = window.getComputedStyle(previewElement);
        
        // 计算尺寸
        const text = previewElement.textContent;
        const fontSize = parseInt(computedStyle.fontSize) * scale;
        const fontFamily = computedStyle.fontFamily;
        const fontWeight = computedStyle.fontWeight;
        
        // 设置Canvas尺寸
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize * 1.2; // 估算高度
        
        // 添加边距
        const padding = 40 * scale;
        canvas.width = textWidth + padding * 2;
        canvas.height = textHeight + padding * 2;
        
        // 设置背景
        if (bgColor !== 'transparent') {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // 设置文字样式
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 应用文字样式效果
        applyTextStyleToCanvas(ctx, currentStyle, fontSize);
        
        // 绘制文字
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        
        // 根据格式处理导出
        if (format === 'svg') {
            exportAsSVG(canvas, text, bgColor);
        } else if (format === 'pdf') {
            exportAsPDF(canvas, text, bgColor);
        } else {
            // PNG/JPG导出
            const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
            const quality = format === 'jpg' ? 0.9 : undefined;
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `bigtext-${Date.now()}.${format}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showMessage(`${format.toUpperCase()} image exported successfully!`, 'success');
            }, mimeType, quality);
        }
        
    } catch (error) {
        console.error('导出图片失败:', error);
        showMessage('Export failed, please try again', 'error');
    }
}

/**
 * 在Canvas上应用文字样式
 */
function applyTextStyleToCanvas(ctx, style, fontSize) {
    try {
        switch (style) {
            case 'normal':
                ctx.fillStyle = textColorPicker.value;
                break;
            case 'bold':
                ctx.fillStyle = textColorPicker.value;
                ctx.font = `bold ${fontSize}px ${ctx.font.split(' ').slice(1).join(' ')}`;
                break;
            case 'shadow':
                ctx.fillStyle = textColorPicker.value;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetX = 4;
                ctx.shadowOffsetY = 4;
                break;
            case 'outline':
                ctx.fillStyle = 'transparent';
                ctx.strokeStyle = textColorPicker.value;
                ctx.lineWidth = 3;
                break;
            case 'neon':
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = textColorPicker.value;
                ctx.shadowBlur = 20;
                break;
            case 'gothic-reverie':
                ctx.fillStyle = '#6b46c1';
                ctx.shadowColor = '#4c1d95';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                break;
            case 'gentle-calligraphy':
                ctx.fillStyle = '#7c3aed';
                ctx.shadowColor = 'rgba(124, 58, 237, 0.5)';
                ctx.shadowBlur = 3;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                break;
            case 'gothic-intrigue':
                ctx.fillStyle = '#1f2937';
                ctx.shadowColor = '#000';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 3;
                break;
            case 'monospace-elegance':
                ctx.fillStyle = '#374151';
                ctx.shadowColor = 'rgba(55, 65, 81, 0.3)';
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                break;
            case 'modern-blockade':
                ctx.fillStyle = '#000';
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 4;
                ctx.shadowOffsetY = 4;
                break;
            case 'urban-square':
                ctx.fillStyle = 'transparent';
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 3;
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 6;
                ctx.shadowOffsetY = 6;
                break;
            case 'modern-clarity':
                ctx.fillStyle = '#374151';
                ctx.shadowColor = 'rgba(55, 65, 81, 0.2)';
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                break;
            case 'vintage-script':
                ctx.fillStyle = '#92400e';
                ctx.shadowColor = 'rgba(146, 64, 14, 0.4)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                break;
            case 'gradient':
                const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
                gradient.addColorStop(0, '#ff6b6b');
                gradient.addColorStop(0.2, '#4ecdc4');
                gradient.addColorStop(0.4, '#45b7d1');
                gradient.addColorStop(0.6, '#96ceb4');
                gradient.addColorStop(0.8, '#feca57');
                gradient.addColorStop(1, '#ff6b6b');
                ctx.fillStyle = gradient;
                break;
            case 'rainbow':
                const rainbowGradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
                rainbowGradient.addColorStop(0, '#ff0000');
                rainbowGradient.addColorStop(0.16, '#ff7f00');
                rainbowGradient.addColorStop(0.33, '#ffff00');
                rainbowGradient.addColorStop(0.5, '#00ff00');
                rainbowGradient.addColorStop(0.66, '#0000ff');
                rainbowGradient.addColorStop(0.83, '#4b0082');
                rainbowGradient.addColorStop(1, '#9400d3');
                ctx.fillStyle = rainbowGradient;
                break;
            case 'bubble':
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = textColorPicker.value;
                ctx.shadowBlur = 15;
                break;
            case 'fire':
                ctx.fillStyle = '#ff4500';
                ctx.shadowColor = '#ff6500';
                ctx.shadowBlur = 10;
                break;
            case 'ice':
                ctx.fillStyle = '#87ceeb';
                ctx.shadowColor = '#b0e0e6';
                ctx.shadowBlur = 15;
                break;
            default:
                ctx.fillStyle = textColorPicker.value;
        }
    } catch (error) {
        console.error('应用文字样式失败:', error);
        ctx.fillStyle = textColorPicker.value;
    }
}

/**
 * 导出为SVG
 */
function exportAsSVG(canvas, text, bgColor) {
    try {
        const svg = `
            <svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
                ${bgColor !== 'transparent' ? `<rect width="100%" height="100%" fill="${bgColor}"/>` : ''}
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
                      font-family="${fontFamilySelect.value}" 
                      font-size="${parseInt(fontSizeSlider.value)}px" 
                      font-weight="${currentStyle === 'bold' ? 'bold' : 'normal'}"
                      fill="${textColorPicker.value}">
                    ${text}
                </text>
            </svg>
        `;
        
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bigtext-${Date.now()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showMessage('SVG exported successfully!', 'success');
    } catch (error) {
        console.error('SVG导出失败:', error);
        showMessage('SVG export failed', 'error');
    }
}

/**
 * 导出为PDF
 */
function exportAsPDF(canvas, text, bgColor) {
    try {
        // 创建PDF内容
        const pdfContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { margin: 0; padding: 20px; }
                    .text-content {
                        font-family: ${fontFamilySelect.value};
                        font-size: ${parseInt(fontSizeSlider.value)}px;
                        font-weight: ${currentStyle === 'bold' ? 'bold' : 'normal'};
                        color: ${textColorPicker.value};
                        text-align: center;
                        ${bgColor !== 'transparent' ? `background-color: ${bgColor};` : ''}
                        padding: 40px;
                    }
                </style>
            </head>
            <body>
                <div class="text-content">${text}</div>
            </body>
            </html>
        `;
        
        // 使用浏览器打印功能生成PDF
        const printWindow = window.open('', '_blank');
        printWindow.document.write(pdfContent);
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
            printWindow.print();
            showMessage('PDF export initiated! Use browser print dialog to save as PDF.', 'success');
        }, 500);
        
    } catch (error) {
        console.error('PDF导出失败:', error);
        showMessage('PDF export failed', 'error');
    }
}

/**
 * 处理动画变化
 */
function handleAnimationChange(event) {
    try {
        const animation = event.target.value;
        updatePreviewAnimation(animation);
    } catch (error) {
        console.error('处理动画变化失败:', error);
    }
}

/**
 * 更新预览动画
 */
function updatePreviewAnimation(animation) {
    try {
        if (previewText) {
            // 移除所有动画类
            const animationClasses = ['animate-bounce', 'animate-pulse', 'animate-shake', 'animate-wiggle', 'animate-glow', 'animate-float', 'animate-slide', 'animate-zoom', 'animate-rotate'];
            animationClasses.forEach(cls => previewText.classList.remove(cls));
            
            // 添加新动画类
            if (animation !== 'none') {
                previewText.classList.add(`animate-${animation}`);
            }
        }
    } catch (error) {
        console.error('更新预览动画失败:', error);
    }
}

/**
 * 处理保存偏好设置
 */
function handleSavePreferences() {
    try {
        const preferences = {
            text: textInput.value,
            fontSize: currentFontSize,
            style: currentStyle,
            fontFamily: fontFamilySelect.value,
            textColor: textColorPicker.value,
            animation: textAnimation.value
        };
        
        localStorage.setItem('bigTextGenerator_preferences', JSON.stringify(preferences));
        showMessage('Preferences saved successfully!', 'success');
    } catch (error) {
        console.error('保存偏好设置失败:', error);
        showMessage('Failed to save preferences', 'error');
    }
}

/**
 * 处理加载偏好设置
 */
function handleLoadPreferences() {
    try {
        const saved = localStorage.getItem('bigTextGenerator_preferences');
        if (!saved) {
            showMessage('No saved preferences found', 'warning');
            return;
        }
        
        const preferences = JSON.parse(saved);
        
        // 应用保存的设置
        textInput.value = preferences.text || '';
        currentFontSize = preferences.fontSize || 60;
        fontSizeSlider.value = currentFontSize;
        fontSizeValue.textContent = `${currentFontSize}px`;
        
        currentStyle = preferences.style || 'bold';
        setActiveStyle(currentStyle);
        
        fontFamilySelect.value = preferences.fontFamily || 'Arial, sans-serif';
        textColorPicker.value = preferences.textColor || '#3b82f6';
        textAnimation.value = preferences.animation || 'none';
        
        // 更新预览
        updatePreview();
        updatePreviewAnimation(preferences.animation || 'none');
        
        showMessage('Preferences loaded successfully!', 'success');
    } catch (error) {
        console.error('加载偏好设置失败:', error);
        showMessage('Failed to load preferences', 'error');
    }
}

/**
 * 处理重置偏好设置
 */
function handleResetPreferences() {
    try {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            // 重置所有设置
            textInput.value = '';
            currentFontSize = 60;
            fontSizeSlider.value = currentFontSize;
            fontSizeValue.textContent = `${currentFontSize}px`;
            
            currentStyle = 'bold';
            setActiveStyle(currentStyle);
            
            fontFamilySelect.value = 'Arial, sans-serif';
            textColorPicker.value = '#3b82f6';
            textAnimation.value = 'none';
            
            // 更新预览
            updatePreview();
            updatePreviewAnimation('none');
            
            // 清除保存的偏好设置
            localStorage.removeItem('bigTextGenerator_preferences');
            
            showMessage('Settings reset to default!', 'success');
        }
    } catch (error) {
        console.error('重置偏好设置失败:', error);
        showMessage('Failed to reset preferences', 'error');
    }
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
