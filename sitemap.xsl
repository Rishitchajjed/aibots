<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>AI Bots XML Sitemap — All 35 Tools Directory</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #0b0f19;
            color: #f1f5f9;
            margin: 0;
            padding: 30px 16px;
          }
          .container {
            max-width: 1040px;
            margin: 0 auto;
            background: #111827;
            border: 1px solid #1f2937;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          }
          h1 {
            color: #ffffff;
            font-size: 1.6rem;
            margin: 0 0 10px 0;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .desc {
            color: #94a3b8;
            font-size: 0.95rem;
            margin-bottom: 24px;
            line-height: 1.6;
          }
          .stats-bar {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-bottom: 24px;
            flex-wrap: wrap;
          }
          .stats-pill {
            background: rgba(99, 102, 241, 0.15);
            border: 1px solid #6366f1;
            color: #a5b4fc;
            font-weight: 700;
            font-size: 0.82rem;
            padding: 5px 14px;
            border-radius: 20px;
          }
          .btn-home {
            background: #6366f1;
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.82rem;
            padding: 6px 14px;
            border-radius: 8px;
            margin-left: auto;
          }
          .btn-home:hover { background: #4f46e5; }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.88rem;
          }
          th {
            background: #1f2937;
            color: #38bdf8;
            text-align: left;
            padding: 12px 14px;
            border-bottom: 2px solid #374151;
            font-weight: 700;
          }
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #1f2937;
          }
          tr:hover td {
            background: rgba(99, 102, 241, 0.06);
          }
          a {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
            color: #93c5fd;
          }
          .priority-pill {
            display: inline-block;
            background: #10b981;
            color: #fff;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.74rem;
            font-weight: 700;
          }
          .priority-high { background: #6366f1; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🤖 AI Bots Search Engine Sitemap</h1>
          <p class="desc">
            Official search engine sitemap for <strong>AI Bots Creative Studio</strong> (<a href="https://www.aibots.co.in">aibots.co.in</a>). All 35 browser-based tools and resources engineered by <strong>Rishit Chajjed</strong> with zero-server privacy.
          </p>
          <div class="stats-bar">
            <span class="stats-pill">Total Indexed Tools: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
            <span class="stats-pill">Protocol: XML Sitemap 0.9</span>
            <a href="https://www.aibots.co.in" class="btn-home">← Launch AI Bots Studio</a>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 55%;">Page Location URL</th>
                <th style="width: 14%;">Priority</th>
                <th style="width: 13%;">Change Frequency</th>
                <th style="width: 13%;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td><xsl:value-of select="position()"/></td>
                  <td>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="priority-pill">
                      <xsl:if test="sitemap:priority &gt;= 0.9">
                        <xsl:attribute name="class">priority-pill priority-high</xsl:attribute>
                      </xsl:if>
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
