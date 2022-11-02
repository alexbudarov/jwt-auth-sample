import { useMemo, useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Space,
  Spin
} from "antd";
import { useForm } from "antd/es/form/Form";
import { DatePicker } from "@amplicode/react";
import { gql } from "@amplicode/gql";
import { useNavigate, useParams } from "react-router-dom";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useSubmitEditor } from "../../../core/crud/useSubmitEditor";
import { ErrorMessages } from "../../../core/crud/ErrorMessages";
import { FormattedMessage, useIntl } from "react-intl";
import { RefetchQueries } from "../../../core/type-aliases/RefetchQueries";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const TICKET = gql(`
  query Ticket_TicketList($id: ID!) {
  ticket(id: $id) {
    airline
    airportFrom
    departureDate
    id
    number
    price
  }
}
`);

const UPDATE_TICKET = gql(`
  mutation UpdateTicket_TicketList($input: TicketInput!) {
  updateTicket(input: $input) {
    airline
    airportFrom
    departureDate
    id
    number
    price
  }
}
`);

export interface TicketDetailsProps<TData = any> {
  /**
   * A list of queries that needs to be refetched once the editor has been submitted.
   * For example, you might need to refresh entity list after editing an entity instance.
   * In simple cases this would be just an array of query names, e.g. ["Get_Pet_List"],
   * or an array of `DocumentNode`s, e.g. [PET_LIST].
   * For more info, check Apollo Client documentation.
   */
  refetchQueries?: RefetchQueries<TData>;
}

export function TicketDetails({
  refetchQueries
}: TicketDetailsProps<QueryResultType>) {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.TicketDetails" }));

  const { recordId } = useParams();

  if (recordId == null) throw new Error("recordId must be defined");
  // Load the item if `id` is provided
  const { item, itemLoading, itemError } = useLoadItem(recordId);

  if (itemLoading) {
    return <Spin />;
  }

  if (itemError) {
    return <RequestFailedError />;
  }

  return (
    <EditorForm item={item} id={recordId} refetchQueries={refetchQueries} />
  );
}

interface EditorFormProps<TData> {
  /**
   * Loaded entity instance (if editing).
   */
  item?: ItemType;
  /**
   *
   */
  id?: string;
  /**
   *
   */
  refetchQueries?: RefetchQueries<TData>;
}

function EditorForm<TData>({
  item,
  refetchQueries,
  id
}: EditorFormProps<TData>) {
  const [form] = useForm();

  // Global error message, i.e. error message not related to a particular form field.
  // Examples: cross-validation, network errors.
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const { handleSubmit, submitting } = useSubmitEditor(
    UPDATE_TICKET,
    setFormErrors,
    form.setFields,
    refetchQueries,
    "TicketInput",
    id
  );
  const handleClientValidationFailed = useClientValidationFailed();

  // Put the item into the form.
  // Item becomes form field values, which will then be used inside `handleSubmit`.
  useFormData(form, item);

  return (
    <Card className="narrow-layout">
      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleClientValidationFailed}
        layout="vertical"
        form={form}
      >
        <FormFields />
        <ErrorMessages errorMessages={formErrors} />
        <FormButtons submitting={submitting} />
      </Form>
    </Card>
  );
}

function FormFields() {
  return (
    <>
      <Form.Item name="airline" label="Airline">
        <Input autoFocus />
      </Form.Item>

      <Form.Item name="airportFrom" label="Airport From">
        <Input />
      </Form.Item>

      <Form.Item name="departureDate" label="Departure Date">
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item name="number" label="Number">
        <Input />
      </Form.Item>

      <Form.Item name="price" label="Price">
        <InputNumber type="number" stringMode />
      </Form.Item>
    </>
  );
}

/**
 * Buttons below the form.
 *
 * @param submitting flag indicating whether submit is in progress
 */
function FormButtons({ submitting }: { submitting?: boolean }) {
  const navigate = useNavigate();

  return (
    <Form.Item className="form-buttons">
      <Space>
        <Button htmlType="button" onClick={() => navigate("..")}>
          <FormattedMessage id="common.cancel" />
        </Button>
        <Button type="primary" htmlType="submit" loading={submitting}>
          <FormattedMessage id={"common.submit"} />
        </Button>
      </Space>
    </Form.Item>
  );
}

/**
 * Loads the item if `id` is provided
 *
 * @param id
 */
function useLoadItem(id: string) {
  // Get the function that will load item from server,
  // also get variables that will contain loading/error state and response data
  // once the response is received
  const [loadItem, { loading, error, data }] = useLazyQuery(TICKET, {
    variables: {
      id
    }
  });

  // Load item if `id` has been provided in props
  useEffect(() => {
    if (id !== "new") {
      loadItem();
    }
  }, [loadItem, id]);

  const item = useMemo(() => deserialize(data?.ticket), [data?.ticket]);

  return {
    item,
    itemLoading: loading,
    itemError: error
  };
}

/**
 * Puts the `item` inside the `form`
 *
 * @param form
 * @param item
 */
function useFormData(form: FormInstance, item?: ItemType) {
  useEffect(() => {
    if (item != null) {
      form.setFieldsValue(item);
    }
  }, [item, form]);
}

/**
 * Returns a callback that is executed when client-side validation of a form has failed
 */
function useClientValidationFailed() {
  const intl = useIntl();

  return useCallback(() => {
    return message.error(
      intl.formatMessage({ id: "EntityDetailsScreen.validationError" })
    );
  }, [intl]);
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof TICKET>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType["ticket"];
