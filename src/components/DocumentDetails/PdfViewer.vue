<template>
  <Card class="pdf-card">
    <div class="pdf-card-header">
      <div class="form-title">
        Document
        <a class="blank-link" :href="downloadPath" :download="fileName" target="_blank">
          <v-icon>mdi-download</v-icon>
        </a>
      </div>
      <v-text-field
        class="search sbr-input"
        color="black"
        label="Search document text"
        prepend-icon="mdi-magnify"
        v-model="searchText"
        :loading="searching"
      />
      <!-- <button v-if="totalMatches > 0" @click="back" class="page-link">Prev</button> -->
      <div v-if="searching">
        {{totalMatches}} matches
      </div>
      <div v-if="!searching && searchText">
        {{totalMatches}} matches
      </div>
      <!-- <button v-if="totalMatches > 0" @click="next" class="page-link">Next</button> -->
    </div>
    <div id="pdfViewer">
      <div class="pageContainerWrapper">
        <div id="pageContainer" :style="{zoom: pageWidthScale}">
          <div id="viewer" class="pdfViewer"></div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import Card from '@/components/Shared/Card';
import { PDFViewer, EventBus, PDFHistory, PDFLinkService, PDFFindController, PDFViewerApplication } from "pdfjs-dist/web/pdf_viewer";

pdfjsLib.GlobalWorkerOptions.workerSrc =
   "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.13.216/build/pdf.worker.min.js";

export default {
  name: 'PdfViewer',
  props: ['file', 'fileName', 'downloadPath'],
  components: {
    Card
  },
  mounted() {
    document.getElementById("pdfViewer").addEventListener('mousewheel', this.handleScroll);
    window.addEventListener('resize', this.setZoom);

    if (this.file) {
      this.loadPdf();
    }
  },
  beforeUnmount() {
    document.getElementById("pdfViewer").removeEventListener('mousewheel', this.handleScroll);
    window.removeEventListener('resize', this.setZoom);
  },
  data: () => ({
    pdfViewer: null,
    eventBus: null,
    pageWidthScale: 1,
    desiredZoom: 1,
    searchText: '',
    searching: false,
    currentMatch: 0,
    totalMatches: 0
  }),
  watch : {
    searchText: function (val) {
      this.search(val);
    },
    file: {
      immediate: true,
      handler(val) {
        if (!!val) {
          this.loadPdf();
        }
      }
    }
  },
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
      this.pdfViewer.setDocument(pdf);
      pdfLinkService.setViewer(this.pdfViewer);
      this.eventBus = eventBus;

      this.pdfHistory = new PDFHistory({
        linkService: pdfLinkService,
        eventBus,
      });
      pdfLinkService.setHistory(this.pdfHistory);
      pdfLinkService.setDocument(pdf);

      this.eventBus._on("pagesloaded", evt => {
        const pages = this.pdfViewer._pages;

        pages.sort((a, b) => {
          return b.viewport.width - a.viewport.width;
        });

        this.widestPage = pages[0];
        this.setZoom();
      }, {
        once: true
      });

      this.eventBus._on('updatefindmatchescount', ({matchesCount}) => {
        this.currentMatch = matchesCount.current;
        this.totalMatches = matchesCount.total;
      });
      this.eventBus._on('updatefindcontrolstate', (state) => {
        console.error(state);
        if (state.state === 0 || state.state === 1) {
          this.searching = false;
        }

        if (state.state === 1) {
          this.totalMatches = 0;
        }
      });
    },
    handleScroll(e) {
      if (e.ctrlKey) {
        const scrollAmount = .1;

        if (e.deltaY > 0 && this.desiredZoom > .2) {
          this.desiredZoom = this.desiredZoom - scrollAmount;
        } else if (e.deltaY < 0) {
          this.desiredZoom = this.desiredZoom + scrollAmount;
        }

        this.setZoom();

        e.preventDefault();
      }
    },
    setZoom() {
        const parentContainer = document.getElementById("pageContainer").parentNode;
        const padding = 20;
        const pageWidthScale = (parentContainer.clientWidth - padding) / this.widestPage.viewport.width * this.desiredZoom;

        this.pageWidthScale = pageWidthScale;
    },
    search(query) {
      this.searching = true;
      this.eventBus.dispatch("find", {
        caseSensitive: false, 
        findPrevious: false,
        highlightAll: true, 
        phraseSearch: true,
        query
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
      console.error("searching", this.searchText);
      this.eventBus.dispatch("findagain", {
        caseSensitive: false, 
        findPrevious: false,
        highlightAll: true, 
        phraseSearch: true,
        query: this.searchText
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
      console.error("searching", this.searchText);
      this.eventBus.dispatch("findagain", {
        caseSensitive: false, 
        findPrevious: true,
        highlightAll: true, 
        phraseSearch: true,
        query: this.searchText
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
.blank-link {
  color: transparent !important;
}

#pdfViewer {
  max-height: 600px;
  overflow: auto;
  padding-top: 15px;
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
  background-color: #f6f6f6;
}

.textLayer .highlight.selected.appended {
  background-color: rgb(255 247 0);
}

.textLayer .highlight.appended {
  background-color: rgb(255 247 0);
}

.pdf-card.card {
  padding: 0px;
  background-color: #f6f6f6;
  overflow: hidden;
}

.pdf-card-header {
  background-color: white;
  border-bottom: solid;
  border-bottom-width: 1px;
  border-bottom-color: #d8d8d8;
  padding: 18px;
}
</style>
