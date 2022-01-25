export const logScaleButton = {
  exporting: {
    buttons: {
      contextButton: {
        enabled: false
      },
      customButton2: {
        text: "Log scale ",
        theme: {
          fill: "#C8C8C8",
          states: {
            hover: {
                fill: "#C8C8C8"
            },
            select: {
                fill: "#a4edba"
            }
        }
        },
        onclick: function () {
          if (!this.logarithmic) {
            this.yAxis[0].update({ type: "logarithmic" });
            this.exportSVGElements[0].setState(2);
            this.logarithmic = true;
          } else {
            this.yAxis[0].update({ type: "linear" });
            this.exportSVGElements[0].setState(0);
            this.logarithmic = false;
          }
        }
      },
    }
  }
};
