export class ODataQueryBuilder {
    private _orderBy: string;
    private _orderByProperty: string;
    private _top: number;
    private _skip: number;
    private _count: boolean;
    private _select: string[] = [];
    private _filters: string[] = [];
  
    count(): ODataQueryBuilder {
      this._count = true;
      return this;
    }
  
    top(amount: number): ODataQueryBuilder {
      this._top = amount;
      return this;
    }
  
    skip(amount: number): ODataQueryBuilder {
      this._skip = amount;
      return this;
    }
  
    paging(currentPage: number, itemsPerPage: number): ODataQueryBuilder {
      this._skip = currentPage * itemsPerPage;
      this._top = itemsPerPage;
      this._count = true;
      return this;
    }
  
    orderBy(property: string, order: string): ODataQueryBuilder {
      this._orderByProperty = property;
      this._orderBy = order;
      return this;
    }
  
    select(properties: string[]): ODataQueryBuilder {
      this._select = [...properties];
      return this;
    }
  
    filter(filterText: string): ODataQueryBuilder {
      this._filters.push(filterText);
      return this;
    }
  
    dateEquals(
      property: string,
      day: number,
      month: number,
      year: number
    ): ODataQueryBuilder {
      this._filters.push(
        `(day(${property}) eq ${day} and month(${property}) eq ${month} and year(${property}) eq ${year})`
      );
      return this;
    }
  
    contains(
      property: string,
      value: string | number | boolean
    ): ODataQueryBuilder {
      this.pushToFilter(
        `contains(${property},${this.convertDataType(value)})`,
        value
      );
      return this;
    }
  
    equals(
      property: string,
      value: string | number | boolean
    ): ODataQueryBuilder {
      this.pushToFilter(`${property} eq ${this.convertDataType(value)}`, value);
      return this;
    }
  
    notEquals(
      property: string,
      value: string | number | boolean
    ): ODataQueryBuilder {
      this.pushToFilter(`${property} ne ${this.convertDataType(value)}`, value);
      return this;
    }
  
    greaterThan(property: string, value: number): ODataQueryBuilder {
      this.pushToFilter(`${property} gt ${value}`, value);
      return this;
    }
  
    greaterThanOrEqual(property: string, value: number): ODataQueryBuilder {
      this.pushToFilter(`${property} ge ${value}`, value);
      return this;
    }
  
    lessThan(property: string, value: number): ODataQueryBuilder {
      this.pushToFilter(`${property} lt ${value}`, value);
      return this;
    }
  
    lessThanOrEqual(property: string, value: number): ODataQueryBuilder {
      this.pushToFilter(`${property} le ${value}`, value);
      return this;
    }
  
    in(property: string, values: number[]): ODataQueryBuilder {
      if (values.length > 0) {
        this._filters.push(`${property} in (${values.join(',')})`);
      }
      return this;
    }
  
    and(): ODataQueryBuilder {
      if (this.checkConditionals()) {
        this._filters.push(' and ');
      }
      return this;
    }
  
    or(): ODataQueryBuilder {
      if (this.checkConditionals()) {
        this._filters.push(' or ');
      }
      return this;
    }
  
    toString(): string {
      let query = '?';
      if (this._count) {
        query = this.concatQueryString(query, '$count=true');
      }
      if (this._orderBy) {
        query = this.concatQueryString(
          query,
          `$orderBy=${this._orderByProperty} ${this._orderBy}`
        );
      }
      if (this._select.length > 0) {
        query = this.concatQueryString(
          query,
          `$select=${this._select.join(',')}`
        );
      }
      if (this._skip) {
        query = this.concatQueryString(query, `$skip=${this._skip}`);
      }
      if (this._top) {
        query = this.concatQueryString(query, `$top=${this._top}`);
      }
      if (this._filters.length > 0) {
        query = this.concatQueryString(
          query,
          `$filter=${this._filters.join('')}`
        );
      }
      return query;
    }
  
    private pushToFilter(
      filterText: string,
      value: string | number | boolean
    ): void {
      if (this.IsValueValid(value)) {
        this._filters.push(filterText);
      }
    }
  
    private convertDataType(value: string | number | boolean): string {
      switch (typeof value) {
        default:
        case 'string':
          return `'${value}'`;
        case 'boolean':
        case 'number':
          return `${value}`;
      }
    }
  
    private concatQueryString(queryString: string, text: string): string {
      queryString = queryString.length > 1 ? queryString + '&' : queryString;
      return queryString + text;
    }
  
    private checkConditionals(): boolean {
      const lastItem = this._filters.length - 1;
      if (
        this._filters[lastItem] === ' and ' ||
        this._filters[lastItem] === ' or ' ||
        this._filters.length === 0
      ) {
        return false;
      }
      return true;
    }
  
    private IsValueValid<T>(value: T | undefined | null): boolean {
      if (value === null || value === undefined) {
        return false;
      } else if (typeof value === 'string') {
        return value.trim().length > 0;
      } else {
        return true;
      }
    }
  }
  