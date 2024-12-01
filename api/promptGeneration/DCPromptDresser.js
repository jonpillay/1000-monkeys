const DCPromptDresser = (promptDecription, userChoices) => {

  const artStyle = userChoices['style']

  let stylePrompt = ''

  switch (artStyle) {
    case 'Comic Book':
      stylePrompt = '(A single, exciting, and exceptionally illustrated comicbook frame in the style of Jack Kirby or John Romita Jr) '
      break

    case 'Anime':
      stylePrompt = '(Anime drawing in the style of (Katsuhiro Otomo):1.8 or (Akira Toriyama):1.8) '
      break

    case 'Cartoon':
      stylePrompt = '(Cartoon drawing in the style of the (Looney Toons):1.8 or (Walt Disney):1.8) '
      break

    case 'Realistic':
      stylePrompt = '(Realistic photographic image. Still shot from a movie.) '
      break

    case 'CGI':
      stylePrompt = '(3D computer generated image in the style of (Dreamworks Entertainment) '
      break

    case 'Frida Kahlo':
      stylePrompt = '(Surrealist painting by the famous mexican artist Frida Kahlo. Bold vibrant colours. Heavy brushstrokes. Impressionist technique. )'
      break

    case 'Dali':
      stylePrompt = 'Surrealist style painting by the famous painter Salvador Dali depicting the scene of '
      break

    case 'Pop Art':
      stylePrompt = 'Bright and bold graphic design piece in the Pop Art style (Roy Lichtenstein)1.5 or (Andy Warhol):1.5 depicting the scene of '
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