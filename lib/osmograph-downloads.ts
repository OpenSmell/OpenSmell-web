export const OSMGRAPH_RELEASE_TAG = "v0.1.2-beta.2"
export const OSMGRAPH_RELEASE_VERSION = "0.1.2 beta 2"
export const OSMGRAPH_REPO = "https://github.com/OpenSmell/osmograph-desktop"
export const OSMGRAPH_RELEASES_URL = `${OSMGRAPH_REPO}/releases`
export const OSMGRAPH_RELEASE_NOTES_URL = `${OSMGRAPH_RELEASES_URL}/tag/${OSMGRAPH_RELEASE_TAG}`
export const OSMGRAPH_DOWNLOAD_PAGE = "/osmograph#download"

const ASSET_BASE = `${OSMGRAPH_RELEASES_URL}/download/${OSMGRAPH_RELEASE_TAG}`

export const OSMGRAPH_DOWNLOADS = {
  windows: `${ASSET_BASE}/Osmograph-setup.exe`,
  macos: `${ASSET_BASE}/Osmograph-macos-aarch64.dmg`,
  "linux-deb": `${ASSET_BASE}/Osmograph-linux-amd64.deb`,
  "linux-rpm": `${ASSET_BASE}/Osmograph-linux-x86_64.rpm`,
  "linux-appimage": `${ASSET_BASE}/Osmograph-linux-x86_64.AppImage`,
} as const

export type OsmographPlatform = keyof typeof OSMGRAPH_DOWNLOADS
