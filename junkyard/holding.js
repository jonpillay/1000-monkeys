const turnPage = (direct) => {
  if (direct == 'back') {
    // story.current = storyPages["textHistory"][renderChapter -1]
    // imgUrl.current = storyPages["imageHistory"][renderChapter -1]
    // sysInfo["currentPage"] --
    // localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
    // setRenderChapter(renderChapter -1)
  } else if (direct == 'next') {
    // sysInfo["currentPage"] ++
    // localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
    // story.current = storyPages["textHistory"][renderChapter +1]
    // imgUrl.current = storyPages["imageHistory"][renderChapter +1]
    // setRenderChapter(renderChapter +1)
  } else if (direct == 'last') {
    // story.current = storyPages["textHistory"].slice(-1)
    // imgUrl.current = storyPages["imageHistory"].slice(-1)
    // sysInfo["currentPage"] = storyPages["textHistory"].length -1
    // localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
    // setRenderChapter = storyPages["textHistory"][storyPages["textHistory"].length -1]
  }
}