/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { ConsentDeleteDialogComponent } from 'app/entities/consent/consent-delete-dialog.component';
import { ConsentService } from 'app/entities/consent/consent.service';

describe('Component Tests', () => {
    describe('Consent Management Delete Component', () => {
        let comp: ConsentDeleteDialogComponent;
        let fixture: ComponentFixture<ConsentDeleteDialogComponent>;
        let service: ConsentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [ConsentDeleteDialogComponent]
            })
                .overrideTemplate(ConsentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
