const SYSTEM_PROMPT = `你是一个智能知识整理助手。当用户粘贴内容时，你需要分析并返回结构化的JSON数据。

分析内容后，返回以下格式的JSON（不要添加任何其他文字）：
{
  "title": "内容标题/主题（不超过30字）",
  "summary": "100字以内的摘要",
  "category": "匹配的分类名（从以下选择：人生哲理、健身知识、面试题库、学习方法、工作技巧、读书笔记、待研究）",
  "tags": ["标签1", "标签2"],
  "highlights": ["关键点1", "关键点2"]
}

注意：
1. 只返回JSON，不要有其他内容
2. category 必须是预设分类中的一种
3. 如果无法分类到预设分类，选择最接近的`;

export async function analyzeContent(content, apiKey, apiUrl, model) {
  if (!apiKey) {
    throw new Error('请先在设置中配置 API Key');
  }

  if (!apiUrl) {
    throw new Error('请先在设置中配置 API 地址');
  }

  if (!model) {
    throw new Error('请先在设置中配置模型名称');
  }

  if (!content || content.trim().length === 0) {
    throw new Error('内容不能为空');
  }

  const truncatedContent = content.length > 5000
    ? content.slice(0, 5000) + '...[内容已截断]'
    : content;

  const response = await fetch(`${apiUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `请分析以下内容并返回JSON：\n\n${truncatedContent}`
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
  }

  const data = await response.json();

  if (!data.content || !data.content[0]?.text) {
    throw new Error('API返回格式错误');
  }

  try {
    const result = JSON.parse(data.content[0].text);
    return {
      title: result.title || '无标题',
      summary: result.summary || '',
      category: result.category || '待研究',
      tags: Array.isArray(result.tags) ? result.tags : [],
      highlights: Array.isArray(result.highlights) ? result.highlights : [],
    };
  } catch (parseError) {
    throw new Error('AI返回格式解析失败');
  }
}
