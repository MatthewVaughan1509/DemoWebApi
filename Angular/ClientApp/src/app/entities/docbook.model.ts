export class ManualContents {
    id : number;
	name: string;
	description: string;
	manualId: number;
	parentId: number;
	pageId: number;
	sortOrder: number;
	insertedBy: string;
	insertedOn: Date;
	modifiedBy: string
	modifiedOn: Date;
}

export class Page {
	id : number;
	name: string;
	htmlText: string;
	insertedBy: string;
	insertedOn: Date;
	modifiedBy: string
	modifiedOn: Date;
}

export class PageLookup {
	id : number;
	name: string;
}

export class PageDetails {
	id : number;
	name: string;
	htmlText: string;
	insertedBy: string;
	insertedOn: Date;
	modifiedBy: string
	modifiedOn: Date;
	tags: Tag[];
}

export class Manual {
	id : number;
	name: string;
	description: string;
	insertedBy: string;
	insertedOn: Date;
	modifiedBy: string
	modifiedOn: Date;
}

export class Pages {
	id : number;
	name: string;
	modifiedBy: string
	modifiedOn: Date;
	tags: string;
	referencedManuals: string;
}

export class Tag {
	id : number;
	name: string;
	insertedBy: string;
	insertedOn: Date;
	modifiedBy: string
	modifiedOn: Date;
}

export class DocBookNotification {
    constructor(
        public type: string,
        public message: string,
        public technicalDetails: string,
    ) { }
}

export class Toaster {
    constructor(
        public toastType: string,
        public displayTime: number,
        public isToastVisible: boolean,
        public toastMessage: string
    ) { }
}
