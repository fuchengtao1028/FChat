package com.example.f_chat.entity;

public class Relation {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation.id
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation.u_host
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    private Integer uHost;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation.u_guest
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    private Integer uGuest;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation.remarks
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    private String remarks;
    private User guest;

    public User getGuest() {
        return guest;
    }

    public void setGuest(User guest) {
        this.guest = guest;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation.id
     *
     * @return the value of relation.id
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation.id
     *
     * @param id the value for relation.id
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation.u_host
     *
     * @return the value of relation.u_host
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    public Integer getuHost() {
        return uHost;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation.u_host
     *
     * @param uHost the value for relation.u_host
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    public void setuHost(Integer uHost) {
        this.uHost = uHost;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation.u_guest
     *
     * @return the value of relation.u_guest
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    public Integer getuGuest() {
        return uGuest;
    }



    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation.u_guest
     *
     * @param uGuest the value for relation.u_guest
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    public void setuGuest(Integer uGuest) {
        this.uGuest = uGuest;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation.remarks
     *
     * @return the value of relation.remarks
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    public String getRemarks() {
        return remarks;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation.remarks
     *
     * @param remarks the value for relation.remarks
     *
     * @mbg.generated Fri Jul 29 22:14:55 CST 2022
     */
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Relation(Integer id, Integer uHost, Integer uGuest, String remarks) {
        this.id = id;
        this.uHost = uHost;
        this.uGuest = uGuest;
        this.remarks = remarks;
    }

    public Relation() {
    }
}