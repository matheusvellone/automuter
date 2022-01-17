const Tab = require('./Tab')

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await Tab.getTab(tabId)
  if (!tab.audible) {
    return
  }

  await Tab.setAllOtherSoundTabsMuted()
  if (!tab.mutedInfo.muted) {
    return
  }

  await Tab.setTabMuted(tabId, false)
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.audible) {
    return
  }

  if (!tab.active) {
    if (tab.mutedInfo.muted){
      return
    }

    await Tab.setTabMuted(tabId, true)
  }

  await Tab.setAllOtherSoundTabsMuted()
  if (!tab.mutedInfo.muted) {
    return
  }

  await Tab.setTabMuted(tabId, false)
})
