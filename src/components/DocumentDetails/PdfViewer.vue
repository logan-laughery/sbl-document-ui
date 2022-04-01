<template>
  <div id="pdfViewer">
    <button @click="search">Search</button>
    <div class="pageContainerWrapper">
      <div id="pageContainer">
        <div id="viewer" class="pdfViewer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { PDFViewer, EventBus, PDFHistory, PDFLinkService, PDFFindController, PDFViewerApplication } from "pdfjs-dist/web/pdf_viewer";

pdfjsLib.GlobalWorkerOptions.workerSrc =
   "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.13.216/build/pdf.worker.min.js";

export default {
  name: 'PdfViewer',
  props: ['file'],
  mounted() {
    console.error(PDFViewerApplication);
    this.loadPdf();
  },
  data: () => ({
    pdfViewer: null,
    eventBus: null
  }),
  methods: {
    async loadPdf() {
      const eventBus = new EventBus();
      const pdfLinkService = new PDFLinkService({
        eventBus
      });
      const findController = new PDFFindController({
        eventBus,
        linkService: pdfLinkService
      });
      const container = document.getElementById("pageContainer");

      this.pdfViewer = new PDFViewer({
        container: container,
        eventBus,
        findController
      });

      const pdfPromise = await pdfjsLib.getDocument(this.file);
      const pdf = await pdfPromise.promise;
      console.log(pdf);
      this.pdfViewer.setDocument(pdf);
      pdfLinkService.setViewer(this.pdfViewer);
      this.eventBus = eventBus;

      this.pdfHistory = new PDFHistory({
        linkService: pdfLinkService,
        eventBus,
      });
      pdfLinkService.setHistory(this.pdfHistory);
      pdfLinkService.setDocument(pdf)
      
    },
    search() {
      console.error("searching", this.pdfViewer.findController.pageMatches);

      this.eventBus.dispatch("find", {
        caseSensitive: false, 
        findPrevious: undefined,
        highlightAll: true, 
        phraseSearch: true,
        query: "fields"
      });
      // this.pdfViewer.findController.executeCommand('find', {
      //     caseSensitive: false, 
      //     findPrevious: undefined,
      //     highlightAll: true, 
      //     phraseSearch: true, 
      //     query: "fields"
      // });
    },
    next() {
      console.error("searching", this.eventBus);
      this.eventBus.dispatch("find", {
        caseSensitive: false, 
        findPrevious: undefined,
        highlightAll: true, 
        phraseSearch: true,
        query: "fields"
      });
      // this.pdfViewer.findController.executeCommand('find', {
      //     caseSensitive: false, 
      //     findPrevious: undefined,
      //     highlightAll: true, 
      //     phraseSearch: true, 
      //     query: "fields"
      // });
    },
    back() {
      console.error("searching", this.pdfViewer.findController);
      this.eventBus.dispatch("find", {
        caseSensitive: false, 
        findPrevious: undefined,
        highlightAll: true, 
        phraseSearch: true,
        query: "fields"
      });
      // this.pdfViewer.findController.executeCommand('find', {
      //     caseSensitive: false, 
      //     findPrevious: undefined,
      //     highlightAll: true, 
      //     phraseSearch: true, 
      //     query: "fields"
      // });
    }
  }
};
</script>

<style>
#pdfViewer {
  max-height: 600px;
  overflow: auto;
}
#pageContainer .pdfViewer .page {
  overflow: hidden;
}
#pageContainer {
  position: absolute;
}

.pageContainerWrapper {
  display: flex;
  justify-content: center;
  position: relative;
  height: 500px;
}

.textLayer .highlight.selected.appended {
  background-color: rgb(255 247 0);
}

.textLayer .highlight.appended {
  background-color: rgb(255 247 0);
}
</style>
