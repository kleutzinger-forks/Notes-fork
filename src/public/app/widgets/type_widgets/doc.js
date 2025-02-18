import TypeWidget from "./type_widget.js";

const TPL = `<div class="note-detail-doc note-detail-printable">
    <style>
        .note-detail-doc-content {
            padding: 15px;
        }
        
        .note-detail-doc-content pre {
            background-color: var(--accented-background-color);
            border: 1px solid var(--main-border-color);
            padding: 15px;
            border-radius: 5px;
        }
    </style>
    
    <div class="note-detail-doc-content"></div>
</div>`;

export default class DocTypeWidget extends TypeWidget {
    static getType() {
        return "doc";
    }

    doRender() {
        this.$widget = $(TPL);
        this.$content = this.$widget.find(".note-detail-doc-content");

        super.doRender();
    }

    async doRefresh(note) {
        const docName = note.getLabelValue("docName");

        if (docName) {
            // find doc based on language
            const lng = i18next.language;
            this.$content.load(`${window.glob.appPath}/doc_notes/${lng}/${docName}.html`, (response, status) => {
                // fallback to english doc if no translation available
                if (status === "error") {
                    this.$content.load(`${window.glob.appPath}/doc_notes/en/${docName}.html`);
                }
            });
        } else {
            this.$content.empty();
        }
    }
}
