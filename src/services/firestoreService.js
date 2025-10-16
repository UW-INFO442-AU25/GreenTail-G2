/**
 * Firebase 读写逻辑的占位实现。
 * MVP 阶段我们仅提供 Promise 模拟接口，方便未来接入 Firestore SDK。
 */

export async function saveQuizResult(result) {
  console.info('[MockFirestore] Saving quiz result', result);
  return Promise.resolve({ success: true });
}

export async function fetchUserWishlist(userId) {
  console.info('[MockFirestore] Fetching wishlist for', userId);
  return Promise.resolve([]);
}
