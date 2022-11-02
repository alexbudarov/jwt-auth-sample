package com.sample.jwtauth.tickets;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class TicketController {
    private final TicketRepository crudRepository;

    public TicketController(TicketRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    @NonNull
    @QueryMapping(name = "ticketList")
    @Secured({"ROLE_ADMIN", "ROLE_TICKET_OPERATOR"})
    public ResultPage<Ticket> findAll(@Argument OffsetPageInput page, @Argument List<TicketOrderByInput> sort, @Argument TicketFilter filter) {
        Pageable pageable = Optional.ofNullable(page)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sort)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sort)));
        Page<Ticket> result = crudRepository.findAll(createFilter(filter), pageable);
        return ResultPage.page(result.getContent(), result.getTotalElements());
    }

    @MutationMapping(name = "deleteTicket")
    @Transactional
    @Secured({"ROLE_ADMIN"})
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Ticket entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "ticket")
    @Transactional(readOnly = true)
    @NonNull
    @Secured({"ROLE_ADMIN", "ROLE_TICKET_OPERATOR"})
    public Ticket findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateTicket")
    @Transactional
    @NonNull
    @Secured({"ROLE_ADMIN", "ROLE_TICKET_OPERATOR"})
    public Ticket update(@Argument @NonNull Ticket input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        return crudRepository.save(input);
    }

    protected Sort createSort(List<TicketOrderByInput> sortInput) {
        if (sortInput == null || sortInput.isEmpty()) {
            return Sort.unsorted();
        }
        List<Sort.Order> orders = sortInput.stream()
                .map(item -> {
                    Sort.Direction direction;
                    if (item.getDirection() == SortDirection.ASC) {
                        direction = Sort.Direction.ASC;
                    } else {
                        direction = Sort.Direction.DESC;
                    }
                    switch (item.getProperty()) {
                        case NUMBER:
                            return Sort.Order.by("number").with(direction);
                        case DEPARTURE_DATE:
                            return Sort.Order.by("departureDate").with(direction);
                        case AIRPORT_FROM:
                            return Sort.Order.by("airportFrom").with(direction);
                        case AIRLINE:
                            return Sort.Order.by("airline").with(direction);
                        case PRICE:
                            return Sort.Order.by("price").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class TicketOrderByInput {

        private TicketOrderByProperty property;
        private SortDirection direction;

        public TicketOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(TicketOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {ASC, DESC}

    public enum TicketOrderByProperty {NUMBER, DEPARTURE_DATE, AIRPORT_FROM, AIRLINE, PRICE}

    protected Specification<Ticket> createFilter(TicketFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.departureDateMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("departureDate"), filter.departureDateMin));
                }
                if (filter.departureDateMax != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("departureDate"), filter.departureDateMax));
                }
                if (filter.priceMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), filter.priceMin));
                }
                if (filter.priceMax != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), filter.priceMax));
                }
                if (filter.number != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("number")), "%" + filter.number.toLowerCase() + "%"));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class TicketFilter {

        private OffsetDateTime departureDateMin;
        private OffsetDateTime departureDateMax;
        private BigDecimal priceMin;
        private BigDecimal priceMax;
        private String number;

        public OffsetDateTime getDepartureDateMin() {
            return departureDateMin;
        }

        public void setDepartureDateMin(OffsetDateTime departureDateMin) {
            this.departureDateMin = departureDateMin;
        }

        public OffsetDateTime getDepartureDateMax() {
            return departureDateMax;
        }

        public void setDepartureDateMax(OffsetDateTime departureDateMax) {
            this.departureDateMax = departureDateMax;
        }

        public BigDecimal getPriceMin() {
            return priceMin;
        }

        public void setPriceMin(BigDecimal priceMin) {
            this.priceMin = priceMin;
        }

        public BigDecimal getPriceMax() {
            return priceMax;
        }

        public void setPriceMax(BigDecimal priceMax) {
            this.priceMax = priceMax;
        }

        public String getNumber() {
            return number;
        }

        public void setNumber(String number) {
            this.number = number;
        }
    }
}