# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# code-style
- When removing UI elements from a page, be non-destructive: just remove the element and let remaining content settle naturally, without restructuring or redesigning the layout. Confidence: 0.70
- When removing content that affects layout positioning, maintain original vertical spacing with a spacer div to preserve the position of elements below. Confidence: 0.70
- When editing content sections, always preserve existing section headings without removing or replacing them. Confidence: 0.80
- When editing content, maintain the existing markup structure and coding patterns rather than restructuring them. Confidence: 0.75
- Never make edits or modify files when the user has only asked to learn or analyze patterns — wait for explicit edit instructions before making any changes. Confidence: 0.75

# writing-style
- Write content in a natural, flowing, human tone. Never use short, fragmented/staccato phrasing. Confidence: 0.90

# design-style
See [design-style/taste.md](design-style/taste.md)
