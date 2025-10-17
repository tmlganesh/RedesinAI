import { NextRequest, NextResponse } from 'next/server';

// Function to sanitize smart quotes and other problematic characters
function sanitizeQuotes(text: string): string {
  return text
    // Replace smart single quotes
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    // Replace smart double quotes
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    // Replace other quote-like characters
    .replace(/[\u00AB\u00BB]/g, '"') // Guillemets
    .replace(/[\u2039\u203A]/g, "'") // Single guillemets
    // Replace other problematic characters
    .replace(/[\u2013\u2014]/g, '-') // En dash and em dash
    .replace(/[\u2026]/g, '...') // Ellipsis
    .replace(/[\u00A0]/g, ' '); // Non-breaking space
}

// Intelligent content filtering to remove unnecessary elements
function smartContentFilter(markdown: string): string {
  const lines = markdown.split('\n');
  const filteredLines: string[] = [];
  
  // Patterns to identify and remove unnecessary content
  const skipPatterns = [
    /^(privacy policy|terms of service|cookie policy|about us|contact us)/i,
    /^(footer|header|navigation|nav|menu|sidebar)/i,
    /^(advertisement|ads|sponsored|promo)/i,
    /^(subscribe|newsletter|follow us|social media)/i,
    /^(copyright|©|all rights reserved)/i,
    /^\s*\[?\s*(skip|next|previous|back|home)\s*\]?\s*$/i,
    /^\s*\d+\s*\/\s*\d+\s*$/,  // Pagination numbers
    /^\s*page \d+ of \d+/i,
    /^\s*loading/i,
    /^\s*please wait/i,
    /^\s*(sign in|log in|register|create account)/i,
    /^\s*\*{3,}/, // Multiple asterisks
    /^\s*-{3,}/, // Multiple dashes  
    /^\s*_{3,}/, // Multiple underscores
  ];
  
  // Content quality indicators - keep lines with these patterns
  const keepPatterns = [
    /^#+\s+/, // Headers
    /\w{3,}/, // Lines with substantial text
    /^[\s]*[-*+]\s+\w+/, // Bullet points with content
    /^[\s]*\d+\.\s+\w+/, // Numbered lists with content
  ];
  
  let consecutiveEmptyLines = 0;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines (but keep some for structure)
    if (!trimmedLine) {
      consecutiveEmptyLines++;
      if (consecutiveEmptyLines <= 2) {
        filteredLines.push(line);
      }
      continue;
    }
    
    consecutiveEmptyLines = 0;
    
    // Skip lines matching skip patterns
    if (skipPatterns.some(pattern => pattern.test(trimmedLine))) {
      continue;
    }
    
    // Keep lines with quality content
    if (keepPatterns.some(pattern => pattern.test(line)) || trimmedLine.length > 20) {
      filteredLines.push(line);
    }
  }
  
  return filteredLines.join('\n');
}

// Create fallback response for blocked websites
function createFallbackResponse(url: string, error: string) {
  console.log(`[scrape-url-enhanced] Creating fallback response for: ${url}`);
  
  // Detect URL patterns and provide appropriate fallback content
  let fallbackContent = '';
  let title = '';
  let description = '';
  
  if (url.includes('linkedin.com')) {
    title = 'LinkedIn - Professional Network';
    description = 'Connect with professionals, find jobs, and build your career on LinkedIn';
    fallbackContent = `# LinkedIn - Professional Network

## About LinkedIn
LinkedIn is the world's largest professional networking platform where professionals connect, share insights, and advance their careers.

## Key Features
- **Professional Networking**: Connect with colleagues, industry leaders, and potential employers
- **Job Search**: Find job opportunities tailored to your skills and experience  
- **Content Sharing**: Share professional updates, articles, and insights
- **Learning**: Access online courses and professional development resources
- **Company Pages**: Follow companies and stay updated on industry news
- **Messaging**: Direct communication with your professional network

## Main Sections
- News Feed with professional updates
- Jobs section for career opportunities
- My Network for managing connections
- Messaging for professional communication
- Profile showcasing professional experience

This is a professional networking platform focused on career development and business connections.`;

  } else if (url.includes('apps.apple.com') || url.includes('play.google.com')) {
    // Handle app store links
    const isAppleStore = url.includes('apps.apple.com');
    const storeName = isAppleStore ? 'App Store' : 'Google Play';
    
    title = `${storeName} - Mobile App Download Page`;
    description = `Download mobile applications from the official ${storeName}`;
    
    // Extract app name from URL if possible
    let appName = 'Mobile App';
    if (url.includes('linkedin')) {
      appName = 'LinkedIn';
      description = 'Professional networking app for mobile devices';
    }
    
    fallbackContent = `# ${appName} - ${storeName}

## Mobile Application
This is a mobile application available for download on ${storeName}.

## Key Features
- Native mobile experience optimized for smartphones and tablets
- Push notifications for real-time updates
- Offline functionality where applicable
- Touch-optimized interface
- Integration with device features

## App Store Elements
- App icon and screenshots
- User ratings and reviews
- App description and features list
- Download/Install button
- Version history and updates
- Developer information
- Privacy policy and permissions

## Design Elements for Recreation
- Clean app store layout
- Featured app imagery
- Rating stars and download counts
- Category and age rating information
- Related apps suggestions

Note: This is a mobile app store page optimized for app discovery and downloads.`;

  } else {
    // Generic fallback for other blocked sites
    const domain = new URL(url).hostname;
    title = `${domain} - Website Content`;
    description = `Content from ${domain}`;
    fallbackContent = `# ${domain}

## Website Information
This website could not be directly scraped due to access restrictions.

## Common Website Elements
- Header with navigation menu
- Main content area
- Footer with links and information
- Responsive design for different screen sizes
- Interactive elements like buttons and forms

## Typical Sections
- Home/Landing page
- About Us
- Services/Products  
- Contact Information
- Blog/News section

Please provide more specific requirements about what type of website you'd like to recreate, and I can generate appropriate content and components.`;
  }

  const formattedContent = `
Title: ${title}
Description: ${description}
URL: ${url}
Note: Content generated using fallback method due to scraping restrictions

Main Content:
${fallbackContent}
  `.trim();

  return {
    success: true,
    url,
    content: formattedContent,
    screenshot: null,
    structured: {
      title,
      description,
      content: fallbackContent,
      url,
      screenshot: null
    },
    contentTiers: {
      tier1: fallbackContent,
      tier2: fallbackContent.substring(0, 10000),
      tier3: fallbackContent.substring(0, 5000),
      tier4: fallbackContent.substring(0, 2000)
    },
    metadata: {
      scraper: 'fallback-generator',
      timestamp: new Date().toISOString(),
      contentLength: formattedContent.length,
      originalLength: 0,
      processedLength: fallbackContent.length,
      optimized: false,
      cached: false,
      tiersAvailable: 4,
      fallbackReason: error,
      blocked: true
    },
    message: `Website scraping blocked - generated fallback content based on URL patterns. You can still create a ${title.toLowerCase()} recreation!`
  };
}

// Progressive content reduction with multiple tiers
function progressiveContentReduction(content: string, tier: number = 1): string {
  const maxLengths = [15000, 10000, 5000, 2000]; // Different size tiers
  const maxLength = maxLengths[tier - 1] || 2000;
  
  if (content.length <= maxLength) {
    return content;
  }
  
  // Smart truncation strategies based on tier
  let result = content;
  
  if (tier === 1) {
    // Tier 1: Remove less important sections
    result = smartContentFilter(result);
  } else if (tier === 2) {
    // Tier 2: Keep only headers and first paragraph of each section
    const lines = result.split('\n');
    const reducedLines: string[] = [];
    let inSection = false;
    let paragraphCount = 0;
    
    for (const line of lines) {
      if (line.match(/^#+\s+/)) {
        // Header line
        reducedLines.push(line);
        inSection = true;
        paragraphCount = 0;
      } else if (line.trim() && inSection && paragraphCount < 2) {
        // First few paragraphs of each section
        reducedLines.push(line);
        if (line.trim().length > 50) paragraphCount++;
      }
    }
    result = reducedLines.join('\n');
  } else if (tier === 3) {
    // Tier 3: Headers and key bullet points only
    const lines = result.split('\n');
    result = lines.filter(line => 
      line.match(/^#+\s+/) || // Headers
      line.match(/^[\s]*[-*+]\s+/) || // Bullet points
      line.match(/^[\s]*\d+\.\s+/) // Numbered lists
    ).join('\n');
  } else {
    // Tier 4: Headers only
    const lines = result.split('\n');
    result = lines.filter(line => line.match(/^#+\s+/)).join('\n');
  }
  
  // Final truncation if still too long
  if (result.length > maxLength) {
    result = result.substring(0, maxLength) + '\n\n[Content truncated for AI processing]';
  }
  
  return result;
}

export async function POST(request: NextRequest) {
  let url = '';
  
  try {
    const requestData = await request.json();
    url = requestData.url;
    
    if (!url) {
      return NextResponse.json({
        success: false,
        error: 'URL is required'
      }, { status: 400 });
    }
    
    console.log('[scrape-url-enhanced] Scraping with Firecrawl:', url);
    
    const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY environment variable is not set');
    }
    
    // Make request to Firecrawl API with maxAge for 500% faster scraping
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        formats: ['markdown', 'html', 'screenshot'],
        waitFor: 3000,
        timeout: 30000,
        blockAds: true,
        maxAge: 3600000, // Use cached data if less than 1 hour old (500% faster!)
        actions: [
          {
            type: 'wait',
            milliseconds: 2000
          },
          {
            type: 'screenshot',
            fullPage: false // Just visible viewport for performance
          }
        ]
      })
    });
    
    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text();
      let errorData;
      
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      
      // Handle specific Firecrawl errors with graceful fallbacks
      if (errorData.error?.includes('not currently supported') || 
          errorData.error?.includes('blocked') ||
          errorData.error?.includes('enterprise')) {
        
        console.log(`[scrape-url-enhanced] Website blocked by Firecrawl, using fallback approach for: ${url}`);
        
        // Return structured fallback data based on URL patterns
        return NextResponse.json(createFallbackResponse(url, errorData.error));
      }
      
      throw new Error(`Firecrawl API error: ${errorText}`);
    }
    
    const data = await firecrawlResponse.json();
    
    if (!data.success || !data.data) {
      throw new Error('Failed to scrape content');
    }
    
    const { markdown, metadata, screenshot, actions } = data.data;
    // html available but not used in current implementation
    
    // Get screenshot from either direct field or actions result
    const screenshotUrl = screenshot || actions?.screenshots?.[0] || null;
    
    // Sanitize and intelligently process the markdown content
    let sanitizedMarkdown = sanitizeQuotes(markdown || '');
    
    // Apply intelligent content filtering first
    sanitizedMarkdown = smartContentFilter(sanitizedMarkdown);
    
    // Apply progressive content reduction (start with tier 1)
    const originalLength = sanitizedMarkdown.length;
    sanitizedMarkdown = progressiveContentReduction(sanitizedMarkdown, 1);
    
    const isContentOptimized = sanitizedMarkdown.length < originalLength;
    
    console.log(`[scrape-url-enhanced] Content processing: ${originalLength} → ${sanitizedMarkdown.length} chars${isContentOptimized ? ' (optimized)' : ''}`);
    
    // Store multiple content tiers for potential fallback use
    const contentTiers = {
      tier1: sanitizedMarkdown,
      tier2: originalLength > 10000 ? progressiveContentReduction(sanitizeQuotes(markdown || ''), 2) : sanitizedMarkdown,
      tier3: originalLength > 5000 ? progressiveContentReduction(sanitizeQuotes(markdown || ''), 3) : sanitizedMarkdown,
      tier4: originalLength > 2000 ? progressiveContentReduction(sanitizeQuotes(markdown || ''), 4) : sanitizedMarkdown
    };
    
    // Extract structured data from the response
    const title = metadata?.title || '';
    const description = metadata?.description || '';
    
    // Format content for AI with size optimization
    const formattedContent = `
Title: ${sanitizeQuotes(title)}
Description: ${sanitizeQuotes(description)}
URL: ${url}
${isContentOptimized ? 'Note: Content has been optimized for AI processing\n' : ''}
Main Content:
${sanitizedMarkdown}
    `.trim();
    
    return NextResponse.json({
      success: true,
      url,
      content: formattedContent,
      screenshot: screenshotUrl,
      structured: {
        title: sanitizeQuotes(title),
        description: sanitizeQuotes(description),
        content: sanitizedMarkdown,
        url,
        screenshot: screenshotUrl
      },
      // Multiple content tiers for fallback scenarios
      contentTiers,
      metadata: {
        scraper: 'firecrawl-enhanced-v2',
        timestamp: new Date().toISOString(),
        contentLength: formattedContent.length,
        originalLength: originalLength,
        processedLength: sanitizedMarkdown.length,
        optimized: isContentOptimized,
        cached: data.data.cached || false,
        tiersAvailable: Object.keys(contentTiers).length,
        ...metadata
      },
      message: `URL scraped successfully with intelligent processing${isContentOptimized ? ' (content optimized for AI)' : ''} (with caching for 500% faster performance)`
    });
    
  } catch (error) {
    console.error('[scrape-url-enhanced] Error:', error);
    
    const errorMessage = (error as Error).message;
    
    // Handle various error types with fallback responses
    if (errorMessage.includes('not currently supported') || 
        errorMessage.includes('blocked') ||
        errorMessage.includes('enterprise') ||
        errorMessage.includes('access restricted')) {
      
      console.log(`[scrape-url-enhanced] Creating fallback response due to access restriction`);
      return NextResponse.json(createFallbackResponse(url, errorMessage));
    }
    
    // Handle network errors
    if (errorMessage.includes('timeout') || 
        errorMessage.includes('network') ||
        errorMessage.includes('connection')) {
      
      return NextResponse.json({
        success: false,
        error: 'Network timeout or connection issue. Please try again or use a different URL.',
        fallback: createFallbackResponse(url, 'Network error - using fallback content'),
        retryable: true
      }, { status: 408 });
    }
    
    // Handle rate limiting
    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      return NextResponse.json({
        success: false,
        error: 'Rate limit exceeded. Please wait a moment and try again.',
        retryAfter: 60,
        retryable: true
      }, { status: 429 });
    }
    
    // Handle invalid URLs
    if (errorMessage.includes('invalid url') || errorMessage.includes('malformed')) {
      return NextResponse.json({
        success: false,
        error: 'Invalid URL format. Please provide a valid website URL.',
        retryable: false
      }, { status: 400 });
    }
    
    // Generic error fallback
    console.log(`[scrape-url-enhanced] Generic error, providing fallback response`);
    return NextResponse.json({
      success: false,
      error: errorMessage,
      fallback: createFallbackResponse(url, `Scraping failed: ${errorMessage}`),
      retryable: true
    }, { status: 500 });
  }
}