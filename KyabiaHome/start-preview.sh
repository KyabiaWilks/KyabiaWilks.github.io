#!/bin/bash

# KyabiaHome 本地预览启动脚本

echo "🚀 KyabiaHome 本地预览启动脚本"
echo "=================================="

# 检查是否安装了 http-server
if ! command -v http-server &> /dev/null; then
    echo "📦 正在安装 http-server..."
    npm install -g http-server
    if [ $? -ne 0 ]; then
        echo "❌ http-server 安装失败，请手动安装："
        echo "   npm install -g http-server"
        exit 1
    fi
    echo "✅ http-server 安装成功"
fi

# 检查是否安装了 uni-app CLI
if ! command -v uni &> /dev/null; then
    echo "📦 正在安装 uni-app CLI..."
    npm install -g @dcloudio/uni-cli
    if [ $? -ne 0 ]; then
        echo "⚠️  uni-app CLI 安装失败，将使用简单预览模式"
        USE_SIMPLE_PREVIEW=true
    else
        echo "✅ uni-app CLI 安装成功"
        USE_SIMPLE_PREVIEW=false
    fi
else
    echo "✅ uni-app CLI 已安装"
    USE_SIMPLE_PREVIEW=false
fi

echo ""
echo "🎯 选择预览方式："
echo "1. 简单预览（推荐新手）"
echo "2. uni-app 开发模式（需要 CLI）"
echo "3. 打开预览页面"
echo ""

read -p "请选择 (1-3): " choice

case $choice in
    1)
        echo "🌐 启动简单预览模式..."
        echo "📱 在浏览器中打开: http://localhost:8080"
        echo "⏹️  按 Ctrl+C 停止服务"
        echo ""
        http-server -p 8080 -o
        ;;
    2)
        if [ "$USE_SIMPLE_PREVIEW" = true ]; then
            echo "❌ uni-app CLI 未安装，无法使用此模式"
            echo "🔄 切换到简单预览模式..."
            http-server -p 8080 -o
        else
            echo "🔧 启动 uni-app 开发模式..."
            echo "📱 在浏览器中打开: http://localhost:8080"
            echo "⏹️  按 Ctrl+C 停止服务"
            echo ""
            npm run dev:h5
        fi
        ;;
    3)
        echo "📄 打开预览页面..."
        if command -v open &> /dev/null; then
            open local-preview.html
        elif command -v xdg-open &> /dev/null; then
            xdg-open local-preview.html
        else
            echo "请手动打开 local-preview.html 文件"
        fi
        ;;
    *)
        echo "❌ 无效选择，使用默认简单预览模式"
        http-server -p 8080 -o
        ;;
esac
