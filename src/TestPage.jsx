import React from 'react';
import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">GreenTail 测试页面</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-800">核心功能</h2>
            <div className="space-y-2">
              <Link to="/" className="block text-blue-600 hover:underline">🏠 首页</Link>
              <Link to="/search" className="block text-blue-600 hover:underline">🔍 搜索页面 (含地图)</Link>
              <Link to="/results" className="block text-blue-600 hover:underline">📊 结果页面 (含地图)</Link>
              <Link to="/shops-near-you" className="block text-blue-600 hover:underline">🏪 商店页面 (含地图)</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-800">用户流程</h2>
            <div className="space-y-2">
              <Link to="/quiz" className="block text-blue-600 hover:underline">📝 测验页面 (含YouTube视频)</Link>
              <Link to="/quiz/0" className="block text-blue-600 hover:underline">📝 测验步骤 0 (含YouTube视频)</Link>
              <Link to="/first-time" className="block text-blue-600 hover:underline">👶 新手页面</Link>
              <Link to="/compare" className="block text-blue-600 hover:underline">⚖️ 对比页面</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-800">其他页面</h2>
            <div className="space-y-2">
              <Link to="/about" className="block text-blue-600 hover:underline">ℹ️ 关于页面</Link>
              <Link to="/profile" className="block text-blue-600 hover:underline">👤 个人资料</Link>
              <Link to="/login" className="block text-blue-600 hover:underline">🔐 登录页面</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-800">🗺️ 地图功能测试</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>搜索页面:</strong> 点击"🗺️ Find Stores Near You"按钮或产品的"📍 Find Nearby"按钮</p>
            <p><strong>结果页面:</strong> 点击"🗺️ Find Stores Near You"按钮或产品的"📍 Find Nearby"按钮</p>
            <p><strong>商店页面:</strong> 点击"Open Interactive Map"按钮</p>
            <p><strong>预期结果:</strong> 弹出地图弹窗，显示西雅图地区的商店位置</p>
          </div>
        </div>

        <div className="mt-8 bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">📺 YouTube视频功能测试</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>测验页面:</strong> 访问 <code>/quiz</code> 或 <code>/quiz/0</code></p>
            <p><strong>视频位置:</strong> 在"Start Quiz"按钮下方</p>
            <p><strong>视频内容:</strong> Pet Nutrition Guide for New Pet Parents (从第6秒开始)</p>
            <p><strong>预期结果:</strong> YouTube视频正常加载和播放，响应式设计</p>
            <p><strong>视频链接:</strong> <a href="https://www.youtube.com/watch?v=RXh5yyGmP5k&t=6s" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.youtube.com/watch?v=RXh5yyGmP5k&t=6s</a></p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">👥 用户角色测试</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Emma Chen (环保意识用户)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 测试环保产品筛选</li>
                <li>• 测试环境影响信息</li>
                <li>• 测试产品对比功能</li>
                <li>• 测试地图商店筛选</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sarah Williams (新手用户)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 测试教育性内容</li>
                <li>• 测试新手友好界面</li>
                <li>• 测试指导性功能</li>
                <li>• 测试地图使用指导</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">📱 响应式测试</h2>
          <div className="text-gray-700">
            <p className="mb-2">测试不同屏幕尺寸:</p>
            <ul className="text-sm space-y-1">
              <li>• <strong>桌面:</strong> 1920x1080, 1366x768</li>
              <li>• <strong>平板:</strong> iPad (768x1024)</li>
              <li>• <strong>手机:</strong> iPhone (375x667), Android (360x640)</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-red-800">🐛 问题报告</h2>
          <div className="text-gray-700">
            <p className="mb-2">如果发现任何问题，请提供:</p>
            <ul className="text-sm space-y-1">
              <li>• 浏览器类型和版本</li>
              <li>• 控制台错误信息 (F12)</li>
              <li>• 复现步骤</li>
              <li>• 预期结果 vs 实际结果</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
