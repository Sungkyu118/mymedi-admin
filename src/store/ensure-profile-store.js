let profileModulePromise = null;

export async function ensureProfileStore(store) {
  if (store.hasModule("profile")) {
    return;
  }

  if (!profileModulePromise) {
    profileModulePromise = import("./modules/profile-module").then(
      ({ default: profileModule }) => {
        if (!store.hasModule("profile")) {
          store.registerModule("profile", profileModule);
        }
      }
    );
  }

  await profileModulePromise;
}
