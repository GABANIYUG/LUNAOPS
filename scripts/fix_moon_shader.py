with open('src/landing.ts', 'r', encoding='utf-8') as f:
    text = f.read()

target = """    vec3 perturbNormal(vec3 N, vec3 V, vec2 uv) {
      vec3 dPdx = dFdx(vWorldPos); vec3 dPdy = dFdy(vWorldPos);
      vec2 dUdx = dFdx(uv);         vec2 dUdy = dFdy(uv);
      vec3 T = normalize(dPdx * dUdy.y - dPdy * dUdx.y);
      vec3 B = normalize(dPdy * dUdx.x - dPdx * dUdx.x);
      vec3 nm = texture2D(normalTexture, uv).rgb * 2.0 - 1.0;
      return normalize(mat3(T, B, N) * nm);
    }
    void main() {
      vec3 N_geom = normalize(vNormal);
      vec3 V = normalize(vViewVector);
      vec3 L = normalize(sunDir);
      vec3 N = perturbNormal(N_geom, V, vUv);
      vec3 albedo = texture2D(colorTexture, vUv).rgb;
      float NdotL = dot(N, L);
      float direct = max(NdotL, 0.0);
      float retro = pow(max(dot(N, normalize(L + V)), 0.0), 3.0) * 0.14;
      vec3 diffuse = albedo * (direct * 1.35 + retro);
      float es = max(-NdotL, 0.0) * earthshine;
      vec3 esColor = vec3(0.12, 0.28, 0.65) * es * albedo;
      gl_FragColor = vec4(diffuse + esColor, opacity);
    }"""

replacement = """    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vViewVector);
      vec3 L = normalize(sunDir);

      // Safe normal perturbation using analytic sphere tangents (no dFdx/dFdy artifacts at distance)
      vec4 nSample = texture2D(normalTexture, vUv);
      if (length(nSample.rgb) > 0.15) {
        vec3 nm = nSample.rgb * 2.0 - 1.0;
        vec3 up = abs(N.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0);
        vec3 tangent = normalize(cross(up, N));
        vec3 bitangent = cross(N, tangent);
        N = normalize(N + (tangent * nm.x + bitangent * nm.y) * 0.45);
      }

      // Albedo from NASA LROC texture, with regolith fallback while texture streams in
      vec3 albedo = texture2D(colorTexture, vUv).rgb;
      if (length(albedo) < 0.02) {
        albedo = vec3(0.58, 0.57, 0.56);
      }

      float NdotL = dot(N, L);
      float direct = max(NdotL, 0.0);
      float retro = pow(max(dot(N, normalize(L + V)), 0.0), 3.0) * 0.20;
      vec3 diffuse = albedo * (direct * 1.45 + retro);

      // Earthshine on night side
      float es = max(-NdotL, 0.0) * earthshine;
      vec3 esColor = vec3(0.18, 0.38, 0.85) * es * albedo;

      // Subtle ambient starlight so the Moon's spherical form & craters remain visible in deep space
      vec3 ambient = albedo * 0.09;

      gl_FragColor = vec4(diffuse + esColor + ambient, opacity);
    }"""

if target in text:
    text = text.replace(target, replacement)
    print("Replaced with LF!")
elif target.replace('\n', '\r\n') in text:
    text = text.replace(target.replace('\n', '\r\n'), replacement.replace('\n', '\r\n'))
    print("Replaced with CRLF!")
else:
    print("Target not found directly, using regex...")
    import re
    pat = re.compile(r'vec3 perturbNormal\(vec3 N.*?\ngl_FragColor = vec4\(diffuse \+ esColor, opacity\);\s*}', re.DOTALL)
    text = pat.sub(replacement, text)
    print("Replaced with regex!")

with open('src/landing.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated src/landing.ts!")
