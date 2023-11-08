import marked from 'marked';
import { secondsToTime, buildAutoSeekUrl } from '../utils';
import { INSTALLATION_URL } from '../constants';

class Markdown {
  static toText(markdownContent) {
    const div = document.createElement('div');
    div.innerHTML = marked(markdownContent);
    return div.innerText;
  }

  static toHTML(markdownContent) {
    return marked(markdownContent);
  }

  static pagesToMarkdown(pages) {
    let data = ``;

    for (let page of pages) {
      const { meta, notes } = page;
      data += `- [${meta.title}](${meta.url})`.trimEnd() + '\n';

      for (let note of notes) {
        data += `    - [${secondsToTime(note.timestamp)}](${buildAutoSeekUrl(
          meta.url,
          note.timestamp
        )}) `;
        data += note.content.trimEnd() + '\n';
      }
    }

    return data;
  }
}

export default Markdown;
