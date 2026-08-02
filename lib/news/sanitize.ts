/**
 * Strips HTML tags, WPBakery / Gutenberg shortcodes, and normalises whitespace
 * from a WordPress excerpt or content string.
 *
 * Used when displaying WordPress-sourced excerpts to prevent raw markup or
 * shortcode strings (e.g. [vc_row][vc_column]…[/vc_column][/vc_row]) from
 * leaking into the UI.
 *
 * Note: not used in the current mock phase — wire it in when the WordPress
 * REST API adapter is enabled and excerpt display is added.
 */
export function stripWpContent(input: string): string {
  if (!input) return ""

  return (
    input
      // Remove shortcode blocks: [tag ...] ... [/tag]
      .replace(/\[\/?\w+[^\]]*\]/g, "")
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Decode common HTML entities
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&nbsp;/g, " ")
      // Collapse multiple whitespace / newlines into a single space
      .replace(/\s+/g, " ")
      .trim()
  )
}
