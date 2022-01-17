module.exports = class Tab {
  static getTab(id) {
    return chrome.tabs.get(id)
  }

  static setTabMuted(id, muted) {
    console.debug('setting tab muted', id, muted)
    return chrome.tabs.update(id, { muted })
  }

  static async setAllOtherSoundTabsMuted() {
    console.debug('setting all other sound tabs muted')
    const allTabs = await chrome.tabs.query({
      muted: false,
      active: false,
      audible: true,
    })

    const unmutePromises = allTabs
      .map(tab => Tab.setTabMuted(tab.id, true))

    return Promise.all(unmutePromises)
  }
}
