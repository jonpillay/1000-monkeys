const DCPromptDresser = (promptDecription, userChoices) => {

  const artStyle = userChoices['style']

  let stylePrompt = ''

  switch (artStyle) {
    case 'Comic Book':
      stylePrompt = '(A single, exciting, and exceptionally illustrated comicbook frame in the style of Jack Kirby or John Romita Jr) '
      break

    case 'Anime':
      stylePrompt = '(Anime drawing in the style of Katsuhiro Otomo or Akira Toriyama) '
      break

    case 'CGI':
      stylePrompt = 'Detailed computer generated image of '
      break

    case 'Frida Kahlo':
      stylePrompt = '(Surrealist painting by the famous mexican artist Frida Kahlo. Bold vibrant colours. Heavy brushstrokes. Impressionist technique. )'
      break

    case 'Dali':
      stylePrompt = 'Surrealist style painting by the famous painter Salvador Dali depicting the scene of '
      break

    case 'Pop Art':
      stylePrompt = 'Pop Art style image by Roy Lichtenstein or Andy Warhol depicting the scene of '
      break

    case 'Jean Michel Basquiat':
      stylePrompt = 'Artistic image in the style of Jean Michel Basquiat depicting the scene of '
      break

    case 'Yayoi Kusama':
      stylePrompt = 'Contemporary Pop Art Image in the style of Yayoi Kusama depicting the scene of '
      break

    case 'Ralph Steadman':
      stylePrompt = 'Stylistic drawing by the artist Ralph Steadman in pencil and watercolours depicting the scene of '
      break

    case 'Banksy':
      stylePrompt = 'Artistic image in the style of Banksy depicting the scene of '
  }

  const dressedPrompt = stylePrompt.concat(': '.concat(promptDecription))

  return dressedPrompt

}

module.exports = DCPromptDresser

// final art styles list = 'Comic Book', 'Animie', 'CGI', 'Dali', 'Frida Kahlo'