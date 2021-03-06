/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { ConsentComponent } from 'app/entities/consent/consent.component';
import { ConsentService } from 'app/entities/consent/consent.service';
import { Consent } from 'app/shared/model/consent.model';

describe('Component Tests', () => {
    describe('Consent Management Component', () => {
        let comp: ConsentComponent;
        let fixture: ComponentFixture<ConsentComponent>;
        let service: ConsentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [ConsentComponent],
                providers: []
            })
                .overrideTemplate(ConsentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Consent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.consents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
