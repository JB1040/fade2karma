import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, NgZone } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'f2kHearthstoneManaGraph',
    templateUrl: './hsmanagraph.component.html',
    styleUrls: ['./hsmanagraph.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HearthstoneManaGraphComponent implements OnInit, OnChanges {

    @ViewChild('chart') private chartContainer: ElementRef;
    @Input() private data: Array<any>;
    private margin: any = {top: 22, bottom: 25, left: 0, right: 0};
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private topScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private topAxis: any;
    private yAxis: any;

    constructor() {
    }

    ngOnInit() {
        console.log('window: ', window.innerWidth);
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    }

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    createChart() {
        const element = this.chartContainer.nativeElement;

        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

        const svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);

        // build pattern svg
        svg.append('pattern')
            .attr('id', 'diagonalHatch')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('patternTransform', 'rotate(315 0 0)')
            .attr('width', '5')
            .attr('height', '5')
            .append('line')
            .attr('x1', '0')
            .attr('y1', '0')
            .attr('x2', '0')
            .attr('y2', '10')
            .attr('style', 'stroke:black; stroke-width:7');

        // chart plot area
        this.chart = svg.append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // define X & Y domains
        const xDomain = this.data.map(d => d[0]);
        const yDomain = [0, d3.max(this.data, d => d[1])];
        const topDomain = this.data.map(d => d[1]);

        console.log(`xDomain: ${xDomain} - yDomain: ${yDomain} - topDomain: ${topDomain}`);

        // create scales
        this.xScale = d3.scaleBand().domain(xDomain).rangeRound([0, this.width]);
        this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
        this.topScale = d3.scaleBand().domain(xDomain).rangeRound([0, this.width]);

        // x & y axis
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));

        this.topAxis = svg.append('g')
            .attr('class', 'axis axis-top')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisTop(this.topScale));

    }

    formatXTicks(d) {
        return d === '7' ? '7+' : d;
    }

    updateChart() {
        // update scales & axis
        this.xScale.domain(this.data.map(d => d[0]));
        this.yScale.domain([0, d3.max(this.data, d => d[1])]);
        this.xAxis.transition().call(d3.axisBottom(this.xScale).tickFormat(this.formatXTicks));
        this.topAxis.transition().call(d3.axisTop(this.topScale).tickFormat(d => this.data[d][1]));
        // this.yAxis.transition().call(d3.axisLeft(this.yScale));

        const update = this.chart.selectAll('.bar')
            .data(this.data);

        // remove exiting bars
        update.exit().remove();

        // update existing bars
        this.chart.selectAll('.bar').transition()
            .attr('x', d => this.xScale(d[0]))
            .attr('y', d => this.yScale(d[1]))
            // .attr('width', 40)
            .attr('height', d => this.height - this.yScale(d[1]));

        d3.selectAll('.axis-x .tick')
            .append('g')
            .append('path')
            .attr('d', 'M1.0000000000000002 12.990381056766578Q0 11.258330249197702 1.0000000000000002 9.526279441628825L5.5 1.7320508075688772Q6.5 0 8.5 0L17.5 0Q19.5 0 20.5 1.7320508075688772L25 9.526279441628825Q26 11.258330249197702 25 12.990381056766578L20.5 20.784609690826525Q19.5 22.516660498395403 17.5 22.516660498395403L8.5 22.516660498395403Q6.5 22.516660498395403 5.5 20.784609690826525Z')
            .attr('fill', '#4A90E2')
            .attr('transform', 'translate(-13, 3)');
        d3.selectAll('.axis-x .tick g')
            .append('text')
            .text(d => d === '7' ? '7+' : d)
            .attr('stroke', '#FFFFFF')
            .attr('transform', d => d === '7' ? 'translate(1, 18)' : 'translate(0, 18)');

        d3.selectAll('.axis .tick line, .axis path')
            .attr('stroke', '');

        d3.selectAll('text')
            .attr('font-family', 'Roboto');

        // add new bars
        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => this.xScale(d[0]))
            .attr('y', d => this.yScale(0))
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .transition()
            .delay((d, i) => i * 10)
            .attr('y', d => this.yScale(d[1]))
            .attr('height', d => this.height - this.yScale(d[1]));

        update
            .enter()
            .append('rect')
            .attr('class', 'bar-borders')
            .attr('x', d => this.xScale(d[0]))
            .attr('y', d => 0)
            .attr('width', this.xScale.bandwidth())
            .attr('height', this.height);

        // this.topAxis.transition().call(d3.axisTop(this.topScale).tickValues(this.data.map(d => d[1])));
    }

}
