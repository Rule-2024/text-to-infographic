'use client';

/**
 * 移动端手势支持库
 * 为移动设备提供更好的触摸交互体验
 */

// 滑动方向枚举
export enum SwipeDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

// 滑动事件回调类型
export type SwipeCallback = (direction: SwipeDirection, event: TouchEvent) => void;

// 滑动配置选项
export interface SwipeOptions {
  threshold?: number; // 滑动阈值（像素）
  timeout?: number;   // 滑动超时（毫秒）
  preventDefaultTouchmove?: boolean; // 是否阻止默认的touchmove事件
}

// 默认选项
const DEFAULT_OPTIONS: SwipeOptions = {
  threshold: 50,
  timeout: 300,
  preventDefaultTouchmove: false,
};

/**
 * 添加滑动手势检测
 * @param element 要添加手势的DOM元素
 * @param callback 滑动回调函数
 * @param options 配置选项
 * @returns 清理函数，用于移除事件监听器
 */
export function addSwipeGesture(
  element: HTMLElement,
  callback: SwipeCallback,
  options: SwipeOptions = {}
): () => void {
  // 合并选项
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  
  let startX: number;
  let startY: number;
  let startTime: number;
  let isTracking = false;

  // 触摸开始处理函数
  function handleTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
    isTracking = true;
  }

  // 触摸移动处理函数
  function handleTouchMove(e: TouchEvent) {
    if (mergedOptions.preventDefaultTouchmove) {
      e.preventDefault();
    }
  }

  // 触摸结束处理函数
  function handleTouchEnd(e: TouchEvent) {
    if (!isTracking) return;
    isTracking = false;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const elapsedTime = Date.now() - startTime;
    
    // 检查是否超时
    if (elapsedTime > mergedOptions.timeout!) return;
    
    // 计算水平和垂直距离
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    // 确定滑动方向
    if (Math.max(absX, absY) > mergedOptions.threshold!) {
      if (absX > absY) {
        // 水平滑动
        const direction = deltaX > 0 ? SwipeDirection.RIGHT : SwipeDirection.LEFT;
        callback(direction, e);
      } else {
        // 垂直滑动
        const direction = deltaY > 0 ? SwipeDirection.DOWN : SwipeDirection.UP;
        callback(direction, e);
      }
    }
  }

  // 添加事件监听器
  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchmove', handleTouchMove, { passive: !mergedOptions.preventDefaultTouchmove });
  element.addEventListener('touchend', handleTouchEnd);
  
  // 返回清理函数
  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
  };
}

/**
 * 添加双击手势检测
 * @param element 要添加手势的DOM元素
 * @param callback 双击回调函数
 * @param options 配置选项
 * @returns 清理函数，用于移除事件监听器
 */
export function addDoubleTapGesture(
  element: HTMLElement,
  callback: (event: TouchEvent) => void,
  doubleTapDelay: number = 300
): () => void {
  let lastTap = 0;
  
  function handleTap(e: TouchEvent) {
    const currentTime = Date.now();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < doubleTapDelay && tapLength > 0) {
      callback(e);
      e.preventDefault();
    }
    
    lastTap = currentTime;
  }
  
  element.addEventListener('touchend', handleTap);
  
  return () => {
    element.removeEventListener('touchend', handleTap);
  };
}
