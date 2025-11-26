import xml.dom.minidom
import re

try:
    dom = xml.dom.minidom.parse('public/Asset 1.svg')
    svg = dom.getElementsByTagName('svg')[0]

    # Set className for the svg
    svg.setAttribute('className', 'w-full h-full')

    # Process styles
    style = dom.getElementsByTagName('style')
    class_map = {}
    if style:
        css = style[0].firstChild.nodeValue
        # Parse CSS
        matches = re.findall(r'\.(cls-\d+)\s*\{(.*?)\}', css, re.DOTALL)
        for cls, content in matches:
            props = {}
            content = content.strip()
            for prop in content.split(';'):
                if ':' in prop:
                    k, v = prop.split(':', 1)
                    k = k.strip()
                    v = v.strip()
                    if k == 'clip-path':
                        # Extract url(#id) -> id
                        m = re.search(r'url\(#(.*?)\)', v)
                        if m:
                            props['clipPath'] = f'url(#{m.group(1)})'
                    elif k == 'fill':
                        props['fill'] = v
            class_map[cls] = props
        
        # Remove style tag
        style[0].parentNode.removeChild(style[0])

    # Apply styles to elements
    for elem in dom.getElementsByTagName('*'):
        if elem.hasAttribute('class'):
            cls = elem.getAttribute('class')
            if cls in class_map:
                for k, v in class_map[cls].items():
                    elem.setAttribute(k, v)
                elem.removeAttribute('class')

    # Add animation to top-level groups in Layer_1-2
    layer1 = None
    for g in dom.getElementsByTagName('g'):
        if g.getAttribute('id') == 'Layer_1-2':
            layer1 = g
            break

    if layer1:
        children = [n for n in layer1.childNodes if n.nodeType == n.ELEMENT_NODE]
        for i, child in enumerate(children):
            child.setAttribute('className', 'animate-float')
            # Random duration between 6s and 10s, delay between 0s and 5s
            # Using i to make it deterministic but varied
            duration = 6 + (i % 3) * 2 # 6, 8, 10
            delay = i * 0.7
            # We set a placeholder for style
            child.setAttribute('style', f"animationDuration: '{duration}s', animationDelay: '{delay}s'")

    # Convert to string
    xml_str = svg.toxml()

    # Fix React attributes
    xml_str = xml_str.replace('xmlns:xlink', 'xmlnsXlink')
    xml_str = xml_str.replace('xlink:href', 'href')
    
    # Fix style attribute
    # minidom outputs style="animationDuration: '6s', animationDelay: '0.0s'"
    # We want style={{ animationDuration: '6s', animationDelay: '0.0s' }}
    xml_str = re.sub(r'style="(.*?)"', r'style={{\1}}', xml_str)

    component = f"""
"use client";
import React from 'react';

export default function Asset1() {{
  return (
    {xml_str}
  );
}}
"""

    with open('app/components/Asset1.js', 'w') as f:
        f.write(component)
    print("Successfully created app/components/Asset1.js")

except Exception as e:
    print(f"Error: {e}")
